import {View} from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";

export class RightsView extends View {
    constructor(model){
        super(model);
        //
        const _ =  this;
        _.componentName= 'Rights';
        _.modulePage = 'rights';
        //MainEventBus.add('Loader','modulesLoaded',_.render.bind(_),'RightsViewRender');
        //
        MainEventBus.add(_.componentName,'loadModulesToChangeAvail',_.loadModulesToChangeAvail.bind(_),'RightsView');
        MainEventBus.add(_.componentName,'loadActionsToChangeAvail',_.loadActionsToChangeAvail.bind(_),'RightsView');
//        MainEventBus.add(_.componentName,'loadPagesChangeAvail',_.loadPagesChangeAvail.bind(_),'RightsView');
    }
	pageHeadTpl(){
		const _ =  this;
		_.clearBody(_.contentHead);
		return new Promise(function (resolve) {
			let tpl = _.el('temp',{
				childes:[
					_.el('H1',{
						class:'page-title',
						'data-word':'Rights'
					})
				]
			});
			_.contentHead.append(tpl);
			resolve(_.contentHead);
		})
    }
	loadActionsToChangeAvail(actions){
			const _ = this;
			_.clearBody(systemConts['content'].querySelector('.actionslist'));
			for (let action of actions){
					let right = _.actionTpl(action);
					systemConts['content'].querySelector('.actionslist').append(right);
			}
	}
	loadModulesToChangeAvail(modules){
		const _ = this;
		_.clearBody(_.contentBody.querySelector('.modulelist'));
		for (let module of modules){
			let right = _.rightTpl(module);
			_.contentBody.querySelector('.modulelist').append(right);
		}
	}
	pagesSelectTpl(){
		const _ = this;
		return new Promise(async function(resolve){
			let
				pages = await _.model.getPages(),
				options = [];
			for (let page of pages){
				options.push(
				_.el('OPTION',{
					'data-word':page['name'],
					value:page['id']
				}));
			}
			resolve(options);
			});
    }
	groupsSelectTpl(){
		const _ = this;
		return new Promise(async function(resolve){
			let
				pages = await _.model.getGroups(),
				options = [];
			for (let page of pages){
				options.push(
				_.el('OPTION',{
					'data-word':page['name'],
					value:page['id']
				}));
			}
			resolve(options);
			});
    }
	filterTpl(){
			const _ = this;
			let tpl = {
					el: _.createEl('DIV','page-filter'),
					childes: [{
							el: _.createEl('DIV','lang-select'),
							childes: [{
									el:_.createEl('DIV','page-inpt'),
									childes: [{
											el:_.createEl('SPAN',null,{'data-word':'Choose group'})
									},{
											el:_.createEl('SELECT','rights-group',{'data-change-action':"Rights:changeGroup"}),
											childes:[
													{el:_.createEl('OPTION',null,{value:'2','data-word':"Administrators"})},
													{el:_.createEl('OPTION',null,{value:'3','data-word':"Users"})}

											]
									}]
							}]
					},{
							el: _.createEl('DIV','page-search'),
							childes: []
					}]
			};
			return _.createTpl(tpl, 'RightsFilterTpl');
}
	rightTpl(rightData){
		const _ = this;
		let inptParam = {
			'data-change-action':`${_.componentName}:changeModuleOnPage`,
			'data-id':`${rightData['module_id']}`,
			type:'checkbox',
			id:`module-${rightData['module_id']}`
		};
		if(rightData['page_id']){
			inptParam['checked'] = true;
		}
		return _.el("LI",{
			class: 'rights-page',
			childes:[
				_.el('INPUT',inptParam),
				_.el('LABEL',{
					for:`module-${rightData['module_id']}`,
					childes:[
						_.el('STRONG',{'text':`${rightData['name']}`}),
						_.el('DIV',{
							class:'rights-action',
							childes:[
								_.el('INPUT',{
									'data-id':`${rightData['module_id']}`,
									class:'rights-inpt',
									type:'text',
									name:'sort',
									'data-change-action':`${_.componentName}:changeSortModuleOnPage`,
									value: rightData['sort'] ? rightData['sort'] : ''
								}),
								_.el('SPAN')
							]
						})
					
					]
				})
			]
		});
	}
	actionTpl(rightData){
		const _ = this;
		let inptParam = {
			'data-id': `${rightData['id']}`,
			'data-change-action':'Rights:changeActionAvail',
			type:'checkbox',
			id:`action-${rightData['id']}`};
		if(rightData['access']){
			inptParam['checked'] = true;
		}
		let tpl =  {
			el: _.createEl('LI','rights-page'),
			childes:[
				{ el:_.createEl('INPUT',null, inptParam)},
				{
					el:_.createEl('LABEL',null, {for:`action-${rightData['id']}`}),
					childes:[
							{
									el:_.createEl('STRONG',null,{'text':`${rightData['name']}`})
							},{
									el:_.createEl('SPAN')
							}
					]
				},
			]
		};
		return _.createTpl(tpl);
	}
	async modulesTpl(){
		const _ = this;
		return new Promise(async function (resolve){
			let tpl = _.el('DIV',{
				class: 'page-body-in rights-in',
				childes:[
					_.el('DIV',{
						class:'page-body-block',
						childes:[
							_.el('DIV',{
								class:'page-body-block-head',
								childes:[
									_.el('DIV',{
										class:'page-inpt rights-select',
										childes:[
											_.el('SPAN',{'data-word':'Choose page'}),
											_.el('SELECT', {
												class: 'rights-page-select',
												'data-change-action':'Rights:choosePage',
												childes: await _.pagesSelectTpl()
											}),
										]
									}),
									_.el('H3',{
										class:'page-body-in-title page-subtitle rights-title',
										'data-word':'Module availability'
									})
								]
							}),
							_.el('UL',{class:'rights-pages modulelist'})
						]
					})
				]
			});
			resolve(tpl);
		});
	}
	async actionsTpl(){
		const _ = this;
		return new Promise(async function (resolve){
			resolve(_.el('DIV',{
			class:'page-body-in rights-head',
			childes:[
				_.el('DIV',{
					class: 'page-body-block',
					childes:[
						_.el('DIV',{
							class: 'page-body-block-head',
							childes:[
								_.el('DIV',{
									class:'page-inpt rights-select',
									childes:[
										_.el('SPAN',{'data-word':'Choose group'}),
										_.el('SELECT', {
											class: 'rights-group-select',
											'data-change-action':'Rights:chooseGroup',
											childes: await _.groupsSelectTpl()
										}),
									]
								}),
								_.el('H3',{
									class:'page-body-in-title page-subtitle rights-title',
									'data-word':'Action availability'
								})
							]
						}),
						_.el('UL',{class:'rights-pages actionslist'})
					]
				})
			]
		})); })
	}
	async bodyTpl(){
		const _ = this;
		return new Promise(async function (resolve){
			let
				modulesTpl =  await _.getTpl('modulesTpl'),
				actionsTpl =  await _.getTpl('actionsTpl');
			_.contentBody.appendChild(modulesTpl);
			_.contentBody.appendChild(actionsTpl);
			let rightsGroup = _.contentBody.querySelector('.rights-group-select'),
			rightsGroupValue = rightsGroup.options[rightsGroup.selectedIndex].value;
			let rightsPage = _.contentBody.querySelector('.rights-page-select');
			let rightsPageValue = rightsPage.options[rightsPage.selectedIndex].value;
			
			await MainEventBus.trigger(_.componentName, 'getModulesToAvail', {'pageId': rightsPageValue});
			await MainEventBus.trigger(_.componentName, 'getActions', {'groupId': rightsGroupValue});
			resolve(_._content);
		});
	}
	render(page){
		const _ = this;
		return new Promise(async function (resolve) {
			if( page === _.modulePage){
				await _.pageHeadTpl();
				resolve(await _.bodyTpl());
			}else{
				resolve(true);
			}
		})
	}
}