import { View } from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";
import {Functions} from "../../libs/Functions.lib.js";
import {TweenMax} from "../../libs/GreenSock.lib.js";
import {Tynt} from "../../libs/Tynt.lib.js";
export class GoodserView extends View {
	constructor(model){
		super(model);
		const _ = this;
		_.componentName = 'goodser';
		_.modulePage = 'goods';
		//
		_.busProp = `${_.componentName}View`;
		MainEventBus
			.on(_,'showForm')
			.on(_,'backToTable')
			.on(_,'doAnimation',_.inputsAnimation.bind(_))
			.add('categorier','changeCat',_.changeCat.bind(_),`${_.componentName}View`);

	}
	/* Templates */
	
	async catsTpl(){
		const _ = this;
		return MainEventBus.trigger('categorier','getCatList');
	}
	async characItemlistTpl(charac){
		const _ = this;
		let list	= await MainEventBus.trigger('categorier','getCurrentPropList',charac['name']);// _.Cat.getCurrentPropList(charac['name']);
		
		let listChildes = [];
		list['props'].forEach(function (prop) {
			listChildes.push(
			_.el('OPTION',{
				value: prop['id'],
				text: prop['value']
			})
			)
		});
		return _.el('DIV',{
			class:'page-inpt',
			style: 'opacity:0',
			childes:[
				_.el('SPAN',{
					text: list['title']
				}),
				_.el('SELECT',{
					'name':`prop-${charac['id']}`,
					childes:listChildes
				})
			]
		})
	}
	characItemTpl(charac){
		const _ = this;
		let tpl = {
			el: _.createEl('DIV','page-inpt',{style:'opacity:0'}),
			childes:[
				{
					el: _.createEl('SPAN',null,{text: charac['name']})
				},{
					el: _.createEl('INPUT',null,{'name':`prop-${charac['id']}`})
				}
			]
		};
		return _.createTpl(tpl);
	}
	async headTpl(){
		const _ = this;
		let tpl =	{
			el : '',
			childes: [
				{
					el:''
				}
			]
		};
		let buffer = _.createTpl(tpl);
		return buffer;
	}
	saveBtnTpl(){
		const _ = this;
		return _.el('BUTTON',{
			class:'btn bg-green',
			title: 'Save product',
			'data-click-action':`${_.componentName}:save`,
			childes:[
				_.el('IMG',{
					src: `/workspace/img/buttons/save.svg`
				})
			]
		});
	}
	pageHeadTpl(pageData = {}){
		const _ =	this;
		return new Promise(function (resolve) {
			let tpl = _.el('temp',{childes:[
					_.el('H1',{
						class:'page-title',
						'data-word':'Goods'
					}),
					_.el('DIV',{
						class:'page-action',
						childes:[
							_.el('BUTTON',{class:'btn bg-blue','data-click-action': `${_.componentName}:importGoods`,type:'button',childes:[
									_.el('IMG',{src:'/workspace/img/import.svg'})
								]}),
							_.el('BUTTON',{class:'btn bg-blue','data-click-action': `${_.componentName}:exportGoods`,type:'button',childes:[
									_.el('IMG',{src:'/workspace/img/export.svg'})
								]}),
							_.el('BUTTON',{
								title: 'Add product',
								class:'btn main-action',
								'save-type':'save',
								'data-click-action':`${_.componentName}:showForm`,
								type:'button',childes:[
									_.el('IMG',{
										src: `/workspace/img/buttons/plus.svg`
									})
								]}),
						]
					})
				]});
			resolve(tpl);
		});
	}
	async pageTpl(){
		const _ = this;
		return new Promise( async function (resolve) {
			let
			tableTpl = await _.getTpl('tableTpl'),
			filterTpl = await _.getTpl('filterTpl'),
			pageHeadTpl = await _.getTpl('pageHeadTpl',{save:false});
			_.clearContent();
			_.contentHead.append(pageHeadTpl);
			_.contentHead.append(filterTpl);
			_.contentBody.append(tableTpl);
			await _.tableRowsTpl({
				page:1
			},true);
			resolve(_._content);
		})
	}
	async filterTpl(){
		const _ = this;
		return new Promise(async function (resolve) {
			let tpl = _.el('DIV',{
				class:'page-filter',
				childes:[
					_.el('DIV',{
						class:"page-search",
						childes:[
							_.el('DIV',{
								class:'page-inpt',
								childes:[
									_.el('INPUT',{
										class:'lang-search-value',
										type:"text",
										'data-word':'Search',
										'data-search-method': 'search',
										'data-input-action':`${_.componentName}:inputSearchQuery`,
										'data-keyup-action':`${_.componentName}:keyUpSearch`
									}),
									_.el('BUTTON',{
										class:'page-btn',
										'data-search-method': 'search',
										'data-click-action':`${_.componentName}:btnSearch`,
										type: 'button',
										childes:[
											_.el('IMG',{src:"/workspace/img/search.svg"})
										]
									})
								]
							}),
						
						]
					})
				]
			});
			resolve(tpl);
		});
	}
	thumbnailTpl(thumbData){
		const _ = this;
		return new Promise(function (resolve) {
			resolve(_.createTpl({
				el: _.createEl('DIV','goods-thumb-main'),
				childes:[
					{
						el: _.createEl('IMG','goods-thumb goods-t',{
							src: thumbData['src'],
							'data-src':thumbData['src']
						})
					}, {
						el: _.createEl('BUTTON','page-btn goods-thumb-del ',{
							type:'button',
							'data-click-action':`${_.componentName}:deleteMainImage`}),
						childes:[{
							el: _.createEl('IMG',null,{src:'/workspace/img/delete.svg'})
						}
						]
					}
				]
			}
			));
		});
	}
	async thumbListItem(thumbData){
		const _ = this;
		let src = thumbData['fullPath'] ? thumbData['fullPath'] : thumbData['src'];
		return _.el('DIV',{
			class:'goods-thumb-list-item',
			'data-click-action':`${_.componentName}:changeMainThumb`,
			'data-path': src,
			childes:[
				_.el('IMG',{
					class:'goods-t',
					src: thumbData['src'],
					'data-src':thumbData['src']
				}),
				_.el('BUTTON',{
					class:'page-btn goods-thumb-del',
					type:'button',
					'data-click-action':`${_.componentName}:deleteImage`,
					childes:[
						_.el('IMG',{
							src:'/workspace/img/delete.svg'
						})
					]
				})]
		});
	}
	async formTpl(goodsData){
		const _ = this;
		let catsTpl = await _.catsTpl();
		return new Promise(function(resolve){
			let tpl = _.el(
			"FORM",{
				class:'page-form goods-form',
				'data-submit-action':`${_.componentName}:save`,
				'save-type': goodsData['saveType'],
				childes:[
					_.el('INPUT',{
						class:'goods-cid', type:'hidden'
					}),
					_.el('INPUT',{
						name:'id', type:'hidden'
					}),
					_.el('DIV',{
						class:'page-form-right',
						childes:[
							_.el('DIV',{
								class:'page-form-right-head',
								childes:[
									_.el('H2',{
										class:'page-subtitle',
										'data-word':'Adding a product'
									})
								]
							}),
							_.el('DIV',{
								class:'page-form-body goods-row',
								childes:[
									_.el('DIV',{
										class: 'goods-left goods-side page-form-left',
										childes:[
											_.el('DIV',{
												class:'goods-thumb',
												childes:[
													_.el('SPAN',{'data-word':'Image'}),
													_.el('DIV',{
														class:'goods-thumb-body',
														childes:[
															_.el('BUTTON',{
																class:'page-btn goods-thumb-btn',
																title: 'Save product',
																'data-click-action': `${_.componentName}:addProductThumbnail`,
																type:'button',
																childes:[
																	_.el('IMG',{src: '/workspace/img/plus.svg'})
																]
															})
														]
													}),
													_.el('DIV',{class:'goods-thumb-list'})
												]
											}),
											_.el('SPAN',{
												'data-word':'Category'
											}),
											catsTpl,
											_.el('INPUT',{
												class:'goods-cat',
												type:'hidden'
											}),
										]
									}),
									_.el('DIV',{
										class: 'goods-right goods-side page-form-right',
										childes:[
											_.inptTpl({
												title: 'Title', name:'title', required:true
											}),
											_.inptTpl({
												title: 'Article', name:'article'
											}),
											_.inptTpl({
												title: 'Model', name:'model'
											}),
											_.inptTpl({
												title: 'Manufacturer', name:'manufac'
											}),
											_.inptTpl({
												title: 'Price', name:'price'
											}),
											_.inptTpl({
												title: 'Sale', name:'sale'
											}),
											_.inptTpl({
												title: 'Available', name:'avail'
											}),
											_.inptTpl({
												title: 'Weight', name:'weight'
											}),
											_.inptTpl({
												title: 'Sort', name:'sort'
											}),
											_.textTpl({
												title: 'Description', name:'description'
											}),
											_.textTpl({
												title: 'Meta description', name:'meta_description'
											}),
											_.textTpl({
												title: 'Meta keywords', name:'meta_keywords'
											})
										
										]
									}),
								]
							}),
						]
					}),
					_.el('DIV',{
						class:'page-form-left',
						childes:[
							_.el('DIV',{
								class:'page-form-right-head',
								childes:[
									_.el('H2',{
										class:'page-subtitle',
										'data-word':'Characteristics'
									})
								]
							}),
							_.el('DIV',{
								class:'page-check',
								childes:[
									_.el('INPUT',{
										type:'checkbox',
										name:'retail',
										id:'retailId'
									}),
									_.el('LABEL',{
										for:'retailId',
										childes:[
											_.el('STRONG',{
												'data-word':'Retail'
											}),
											_.el('SPAN'),
										]
									}),
								]
							}),
							_.el('DIV',{
								class:'page-tynt',
								childes:[
									_.el('SPAN',{
										'data-word':'Characteristics tables'
									}),
									_.el('DIV',{
										class:'page-tynt-body'
									})
								]
							}),
							_.el('DIV',{
								class:'page-form-goods-chars'
							}),
						]
					})
				]
			}
			);
			resolve(tpl);
		});
	}
	async tableRowTpl(rowData){
		const _ = this;
		return new Promise(async function(resolve){
			let	category =	await MainEventBus.trigger('categorier','getCategory',rowData['c_id']);
			let tpl = _.el('TR',{
				childes:[
					_.el('TD',{class:'digit',text:rowData['id']}),
					_.el('TD',{
						childes:[
							_.el('IMG',{
								src:rowData['image'],
								'data-click-action': 'Modaler:showModal'
							})
						]
					}),
					_.el('TD',{text: rowData['title']}),
					_.el('TD',{text: rowData['article']}),
					_.el('TD',{text: category['title']}),
					_.el('TD',{text: rowData['price']}),
					_.el('TD',{text: rowData['avail']}),
					_.el('TD',{
						childes:[
							_.el('DIV',{
								class:'page-table-actions',
								childes:[
									_.el('BUTTON',{class:'page-btn',type:'button','data-click-action':`${_.componentName}:copyGoods`,childes:[
											_.el('IMG',{src:'/workspace/img/copy.svg'})
										]}),
									_.el('BUTTON',{class:'page-btn',type:'button','data-click-action':`${_.componentName}:showGoods`,childes:[
											_.el('IMG',{src:'/workspace/img/show.svg'})
										]}),
									_.el('BUTTON',{class:'page-btn',type:'button','data-item-id':rowData['id'],'save-type':'edit','data-click-action':`${_.componentName}:showForm`,childes:[
											_.el('IMG',{src:'/workspace/img/edit.svg'})
										]}),
									_.el('BUTTON',{
										'data-goods-id': rowData['id'],
										class:'page-btn',
										type:'button','data-click-action':`${_.componentName}:deleteGoods`,childes:[
											_.el('IMG',{src:'/workspace/img/delete.svg'})
										]})
								]
							})
						
						]
					})
				]
			});
			resolve(tpl);
		});
	}
	tableTpl(){
		const _ = this;
		return new Promise(function(resolve){
			let tpl = _.el("TABLE",{
				class:'page-table',
				childes:[
					_.el('THEAD',{
						childes:[
							_.el('TR',{
								childes:[
									_.el('TH',{
										class: 'digit', text: "ID"
									}),
									_.el('TH',{
										'data-word':'Image'
									}),
									_.el('TH',{
										'data-word':'Title'
									}),
									_.el('TH',{
										'data-word':'Article'
									}),
									_.el('TH',{
										'data-word':'Category'
									}),
									_.el('TH',{
										'data-word':'Price'
									}),
									_.el('TH',{
										'data-word':'Available'
									}),
									_.el('TH',{
										'text':'#'
									})
								]
							})
						]
					}),
					_.el('TBODY')
				]
			});
			resolve(tpl);
		});
	}
	
	/* Templates */
	inputsAnimation(cont ='.goods-right' ){
		const _ =	this;
		let animCont = systemConts['content'].querySelector(cont);
		TweenMax.staggerFromTo([...animCont.querySelectorAll('.page-inpt'),...animCont.querySelectorAll('.page-text')],.35,{
			y: 100,
			opacity:0
		},{
			y:0,
			opacity: 1
		},.05);
	}
	async changeCat(catData){
			const	_ = this;
		 await _.fillCharacsList(catData['props']);
	}
	async fillCharacsList(characs){
		const _ = this;
		return new Promise(async function (resolve){
			 let charsCont = systemConts['content'].querySelector('.page-form-goods-chars');
			 _.clearCont(charsCont);
			 if(characs){
				 for (let charac of characs){
						 if((charac['p_type'] == 'list')){
								 charsCont.append(await _.characItemlistTpl(charac));
						 }else{
							charsCont.append(_.characItemTpl(charac));
						 }
				 }
				TweenMax.staggerFromTo(charsCont.querySelectorAll('.page-inpt'),.35,{
					 x: -100,
					 opacity:0
			 },{
					 x:0,
					 opacity: 1
			 },.15);
			 }
			 resolve(charsCont);
		});
	}
	async backToTable(clickData){
		const _ = this;
		await _.pageTpl();
		let
			pageFilter	= _.contentHead.querySelector('.page-filter');
		pageFilter.style.display = 'flex';
		MainEventBus.trigger(_.componentName,'clearForm');
		MainEventBus.trigger('languager','loadTranslate', {
			cont: _._content
		});
	}
	async showForm(clickData){
		const _ = this;
		Functions.showLoader(_.contentBody);
		let
			currentBtn = clickData['item'],
			saveType = currentBtn.getAttribute('save-type'),
			pageFilter	= _.contentHead.querySelector('.page-filter'),
			actionBtn = _.contentHead.querySelector('.main-action'),
			form = await _.formTpl({
				'saveType': saveType
			});
		_.clearBody(_.contentBody);
		
		let saveBtn = _.getTpl('saveBtnTpl');
		_.contentHead.querySelector('.page-action').append(saveBtn);
		_.contentBody.append(form);
		
		_.inputsAnimation();
		actionBtn.querySelector('img').src = '/workspace/img/buttons/back.svg';
		actionBtn.title = 'Back';
		actionBtn.setAttribute('data-click-action',`${_.componentName}:backToTable`);
		pageFilter.style.display = 'none';
		if (_.getAttr(currentBtn,'save-type') === 'edit'){
			await Tynt.init();
			MainEventBus.trigger(_.componentName,'fillForm',currentBtn.dataset.itemId);
		}
		await Tynt.init();
		MainEventBus.trigger('languager','loadTranslate', {
			cont: _._content
		});
		Functions.hideLoader(_.contentBody);
	}
	async render(page) {
		const _ = this;
		return new Promise(async function (resolve) {
			if( page === _.modulePage){
				Functions.showLoader(_._content);
				await _.pageTpl();
				Functions.hideLoader(_._content);
				resolve(true);
			}else{
				resolve(true);
			}
		});
	}
}