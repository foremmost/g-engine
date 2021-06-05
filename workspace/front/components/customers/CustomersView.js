import { View } from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";
import {Functions} from "../../libs/Functions.lib.js";
export class CustomersView extends View {
    constructor(model){
			super(model);
			const _ = this;
			_.modulePage =  'customers';
			_.componentName = 'Customers';
			_.submitActions = {
					'add': `${_.componentName}:saveUser`,
					'edit': `${_.componentName}:editUser`,
			};
			//
			MainEventBus
				.on(_,'showForm')
				.on(_,'backToTable')
				.on(_,'userUpdated')
				.on('filer','changeFile',_.changeThumbnail.bind(_))
    }
    userUpdated(itemData){
        const _ = this;
        let itemRow = systemConts['content'].querySelector(`[data-item-id="${itemData['id']}"]`);
        if(!itemRow) {
            MainEventBus.trigger('Modaler','closeModal');
            return;
        }
        for (let prop in _.model.editedFields){
            let  currentField =  itemRow.querySelector(`[data-name="${prop}"]`);
            if(prop == 'group_id'){
                let groupName = _.model.getInnerItem(_.model.groups,'id',itemData['group_id']*1)['value'];
                currentField.removeAttribute('data-lang');
                currentField.setAttribute('data-word',groupName);
                MainEventBus.trigger('languager','loadTranslate',{cont:itemRow});
            }else if (currentField)  currentField.textContent = _.model.editedFields[prop];
        }
        MainEventBus.trigger('Modaler','closeModal');
    }
    pageHeadTpl(){
			const _ =  this;
			_.clearBody(_.contentHead);
			Functions.showLoader(_.contentHead);
			return new Promise(function(resolve){
				let tpl = _.el('temp',{
					childes:[
						_.el('H1',{
							'data-word':'Customers',
							class:'page-title'
						}),
						_.el('DIV',{
							class:'page-action',
							childes:[
								_.el('BUTTON',{
									class:'btn',
									type:'button','data-click-action': `${_.componentName}:showForm`,
									childes:[
										_.el('IMG',{
											src:'/workspace/img/buttons/plus.svg'
										})
									]
								})
							]
						})
					]
				})
				_.contentHead.append(tpl);
				Functions.hideLoader(_.contentHead);
				resolve(_.contentHead);
			});
    }
    tableRowTpl(rowData){
			const _ = this;
			let groupName = _.model.getInnerItem(_.model.groups,'id',rowData['group_id'])['value'];
			return _.el(
				'TR',{
				'data-item-id':rowData['id'],
				childes:[
					_.tdTpl({
						class:'digit',
						text: rowData['id']
					}),
					_.el('TD',{
						childes:[
							_.el('DIV',{
								class:'page-table-img',
								childes:[
									_.el('IMG',{
										src: rowData['photo']
									})
								]
							})
						]
					}),
					_.tdTpl({
						text: rowData['name']
					}),
					_.tdTpl({
						text: rowData['login']
					}),
					_.el('TD',{
						'data-word': groupName
					}),
					_.el('TD',{
						childes:[
							_.el('DIV',{
								class:'page-table-actions',
								childes:[
									_.el('BUTTON',{
										class:'page-btn',
										'data-user-id':rowData['id'],
										type:'button',
										'data-click-action':`${_.componentName}:showCustomer`,
										childes:[
											_.el('IMG',{src:'/workspace/img/show.svg'})
										]
									}),
									_.el('BUTTON', {
										class: 'page-btn',
										'data-user-id':rowData['id'],
										type:'button',
										'data-click-action':`${_.componentName}:editCustomer`,
										childes:[
											_.el('IMG',{src:'/workspace/img/edit.svg'})
										]
									}),
									_.el('BUTTON',{
										class: 'page-btn',
										'data-user-id':rowData['id'],
										type:'button',
										'data-click-action':`${_.componentName}:deleteCustomer`,
										childes:[
											_.el('IMG',{src:'/workspace/img/delete.svg'})
										]
									})
								]
							})
						]
					})
				]
			});
    }
    tableTpl(){
        const _ = this;
				return _.el('TABLE',{
					class:'page-table',
					childes:[
						_.el('THEAD',{
							childes:[
								_.el('TR',{
									childes:[
										_.el('TH',{class:'digit',text:'ID'}),
										_.el('TH',{'data-word':"Photo"}),
										_.el('TH',{'data-word':"Name"}),
										_.el('TH',{text:'E-mail'}),
										_.el('TH',{'data-word':'Group'}),
										_.el('TH',{class:'digit',text:"#"}),
									]
								})
							]
						}),
						_.el('TBODY')
					]
				});
    }
    filterTpl(){
        const _ = this;
        return _.el('DIV',{
        	class:'page-filter',
					childes:[
						_.el('DIV',{
							class:'page-search',
							childes:[
								_.el('DIV',{
									class:'page-inpt',
									childes:[
										_.el('INPUT',{
											type:"text",
											'data-word':'Search',
											'data-input-action':`${_.componentName}:inputSearchQuery`,
											'data-keyup-action':`${_.componentName}:keyUpSearch`,
										}),
										_.el('BUTTON',{
											class:'page-btn',
											'data-click-action':`${_.componentName}:btnSearch`,
											childes:[
												_.el('IMG',{src:"/workspace/img/search.svg"})
											]
										}),
									]
								})
							]
						})
					]
				});
    }
    listTpl(type='main'){
        const _ = this;
        let tpl = {
            el: _.createEl('UL','page-list')
        };
        return _.createTpl(tpl,`${_.componentName}ListTpl`);
    }
    listRowTpl(listData){
        const _ = this;
        let tpl = {
            el: _.createEl("LI"),
            childes:[
                {
                    el:  _.createEl("BUTTON",null,{
                        'data-word-text': listData['value'],
                        'data-user-id':listData['id'],
                        'data-click-action':`${_.componentName}:editCustomer`,
                        type:'button',
                        text: `${listData['name']} ${listData['second_name']}`
                    }),
                }
            ]
        };
        let listRow = _.createTpl(tpl);
        return listRow;
    }
    async listRowsTpl(listData = {}){
        const _ = this;
        let type = listData['type'] ? listData['type'] : null;
        let rows = listData['items'] ? listData['items'] : await _.model.getTableItems(listData['page']),
            childes = [],
            listTpl = systemConts['content'].querySelector('.page-list');

        for (let row of rows){
            let rowTpl = {el:_.listRowTpl(row)};
            childes.push(rowTpl);
        }
        _.clearBody( listTpl );
        listTpl.append(_.createTpl({el:document.createDocumentFragment(),childes:childes}));

        return listTpl;
    }
    loadCustomersList(customersData) {
        const _ = this;
        _.listRowsTpl(customersData);
    }
		changeThumbnail(){
			const _ = this;
			_.hide(_.addMainThumbBtn);
			_.thumbBody.append(
				_.el('BUTTON',{
					prop: 'deleteMainThumbBtn',
					class:'page-btn page-thumb-delete',
					type:'button',
					'data-click-action':`${_.componentName}:deleteMainThumb`,
					childes:[
						_.el('IMG',{
							src: '/workspace/img/delete.svg'
						})
					]
				})
			);
		}
    thumbnailTpl(photo){
			const _ = this;
			return _.el('DIV',{
				class:'page-thumb',
				childes:[
					_.el('DIV',{
						class: "page-thumb-head",
						childes:[
							_.el('SPAN',{
								'data-word':'photo'
							})
						]
					}),
					_.el('DIV',{
						prop: 'thumbBody',
						class: "page-thumb-body",
						childes:[
							_.el('IMG',{
								prop:'photo',
								class: 'page-thumb-main',
								src: photo
							}),
							_.el('BUTTON',{
								prop: 'addMainThumbBtn',
								class:'page-btn',
								'data-click-action': `filer:showOnModal`,
								type:'button',
								childes:[
									_.el('IMG',{src: '/workspace/img/plus.svg'})
								]
							})
						]
					}),
				
				]
			});
	}
    pageFormLeftTpl() {
        const _ =  this;
        return _.el('DIV',{
					class:'page-form-left',
					childes:[
						_.el('DIV',{
							class:'page-inpt df',
							childes:[
								_.el('INPUT',{
									type: "text",
									'data-word': 'Search',
									'data-template': `loadCustomersList`,
									'data-input-action': `${_.componentName}:inputSearchQuery`,
									'data-keyup-action': `${_.componentName}:keyUpSearch`
								}),
								_.el('BUTTON',{
									class:'page-btn',
									'data-click-action': `${_.componentName}:btnSearch`,
									'data-template': `loadCustomersList`,
									childes:[
										_.el('IMG',{
											src: "/workspace/img/search.svg"
										})
									]
								})
							]
						})
					]
				});
    }
    pageFormRightTpl(){
        const _ =  this;
        return _.el('DIV',{
        	class:'page-form-right',
					childes:[
						_.el('H2',{
							class:'page-subtitle',
							'data-word':'Adding a customer'
						}),
						_.el('FORM',{
							class:'page-form-body',
							'data-submit-action': _.submitActions['add'],
							childes:[
								_.thumbnailTpl(),
								_.inptTpl({
									class:'large',
									'title':'E-mail/Login',
									name:'login',
									type:'email',
									'required':true
								}),
								_.inptTpl({
									class:'large',
									'title':'Name',
									name:'name',
								}),
								_.inptTpl({
									'title':'Surname',
									name:'second_name'
								}),
								_.inptTpl({
									'title':'Group',
									name:'group_id'
								}),
								_.el('DIV',{
									class:'page-inpt',
									childes:[
										_.el('SPAN',{
											'data-word':'Group',
										}),
										_.el('SELECT',{
											name:'group_id',
											childes:[
												_.el('OPTION',{value:'2','data-word':'Administrators'}),
												_.el('OPTION',{value:'3','data-word':'Users'}),
											]
										})
									]
								}),
								_.textTpl({
									'title':'Description',
									name:'description',
								}),
								_.inptTpl({
									'title':'Password',
									name:'pass',
									'required':true
								}),
								_.inptTpl({
									'title':'Confirm password',
									name:'cpass',
									'required':true
								}),
								_.el('DIV',{
									class:'page-do',
									childes:[
										_.el('BUTTON',{
											class:'btn btn-large',
											'data-word':'Save'
										})
									]
								})
							]
						})
					]
				});
    }
    async formToEditTpl(customerData){
        const _ =  this;
        
        return _.el('DIV',{
        	class: 'page-form-right modal-form',
					childes:[
						_.el('H2',{
							class:'page-subtitle',
							'data-word':'Edit profile'
						}),
						_.el('FORM',{
							class:'page-form-body',
							'data-submit-action': _.submitActions['edit'],
							childes:[
								_.el('INPUT',{
									type:'hidden',
									name:'uId',
									value: customerData['id']
								}),
								_.thumbnailTpl(customerData['photo']),
								_.el('DIV',{
									class:'page-inpt large edit',
									childes:[
										_.el('SPAN',{
											'text':'E-mail/Login',
										}),
										_.el('INPUT',{
											'data-input-action':`${_.componentName}:changeFieldValue`,
											name:'login',
											type:'email',
											'required':true,
											text:customerData['login']
										})
									]
								}),
								_.el('DIV',{
									class:'page-inpt large edit',
									childes:[
										_.el('SPAN',{
											'text':'Name',
										}),
										_.el('INPUT',{
											'data-input-action':`${_.componentName}:changeFieldValue`,
											name:'name',
											type:'text',
											'required':true,
											text:customerData['name']
										})
									]
								}),
								_.el('DIV',{
									class:'page-inpt large edit',
									childes:[
										_.el('SPAN',{
											'text':'Surname',
										}),
										_.el('INPUT',{
											'data-input-action':`${_.componentName}:changeFieldValue`,
											name:'second_name',
											type:'text',
											text:customerData['second_name']
										})
									]
								}),
								_.el('DIV',{
									class:'page-inpt large edit',
									childes:[
										_.el('SPAN',{
											'text':'Group',
										}),
										_.el('SELECT',{
											'data-change-action':`${_.componentName}:changeFieldValue`,
											name:'group_id',
											childes:[
												_.el('OPTION',{value:'2','data-word':'Administrators'}),
												_.el('OPTION',{value:'3','data-word':'Users'})
											]
										})
									]
								}),
								_.el('DIV',{
									class:'page-text edit',
									childes:[
										_.el('SPAN',{
											'text':'Description',
										}),
										_.el('TEXTAREA',{
											'data-input-action':`${_.componentName}:changeFieldValue`,
											name:'description',
											text:customerData['description']
										})
									]
								}),
								_.inptTpl({
									class:'large edit',
									'title':'Password',
									name:'pass',
									'required':true
								}),
								_.inptTpl({
									class:'large edit',
									'title':'Confirm password',
									name:'cpass',
									'required':true
								}),
								_.el('DIV',{
									class:'page-do',
									childes:[
										_.el('BUTTON',{
											class:'btn btn-large',
											'data-word':'Save'
										})
									]
								})
							]
						})
					]
				});
        let tpl = {
            el: _.createEl('DIV','page-form-right modal-form'),
            childes: [
                {
                    el: _.createEl('H2','page-subtitle',{'data-word':'Edit profile'})
                },{
                    el: _.createEl('FORM','page-form-body',{'data-submit-action': _.submitActions['edit']}),
                    childes:[
                        {
                            el: _.createEl('INPUT',null,{type:'hidden',name:'uId',value:customerData['id']})
                        },
                        {
                            el: _.createEl('DIV','page-inpt large edit'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'text':'E-mail/Login'}),
                                },{
                                    el: _.createEl('INPUT',null,{
                                        'data-input-action':`${_.componentName}:changeFieldValue`,
                                        name:'login',
                                        type:'email',
                                        'required':true,
                                        text:customerData['login']})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-inpt large edit'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Name'}),
                                },{
                                    el: _.createEl('INPUT',null,{
                                        'data-input-action':`${_.componentName}:changeFieldValue`,
                                        name:'name',type:'text',text:customerData['name']})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-inpt large edit'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Surname'}),
                                },{
                                    el: _.createEl('INPUT',null,{
                                        'data-input-action':`${_.componentName}:changeFieldValue`,
                                        type:'text',name:'second_name',
                                        text:customerData['second_name']})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-inpt edit'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Group'}),
                                },{
                                    el: _.createEl('select',null,{
                                        'data-change-action':`${_.componentName}:changeFieldValue`,
                                        name:'group_id'}),
                                    childes:[
                                        {
                                            el: _.createEl('OPTION',null,{value:'3','data-word':'Users'}),
                                        },{
                                            el: _.createEl('OPTION',null,{value:'2','data-word':'Administrators'}),
                                        }
                                    ]
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-text edit'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Description'}),
                                },{
                                    el: _.createEl('TEXTAREA',null,{
                                        'data-input-action':`${_.componentName}:changeFieldValue`,
                                        name:'description',
																			text:customerData['description']}),
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-inpt large edit'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Password'}),
                                },{
                                    el: _.createEl('INPUT',null,{name:'pass',type:'text'})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-inpt large edit'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Confirm password'}),
                                },{
                                    el: _.createEl('INPUT',null,{name:'cpass',type:'text'})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-do'),
                            childes:[
                                {
                                    el: _.createEl('BUTTON','btn btn-large',{'data-word':'Save'})
                                }
                            ]
                        },
                    ]
                }
            ]
        };
        return _.createTpl(tpl);
    }
    async formToShowTpl(customerId){
        const _ =  this;
        let customerData  = await _.model.getOneItem({itemId:customerId});
        let groupName = _.model.getInnerItem(_.model.groups,'id',parseInt(customerData['group_id']))['value'];
        let tpl = {
            el: _.createEl('DIV','page-form-right modal-form'),
            childes: [
                {
                    el: _.createEl('H2','page-subtitle',{'data-word':'User profile'})
                },{
                    el: _.createEl('DIV','page-form-body'),
                    childes:[
                        {
                            el: _.createEl('DIV','page-form-row'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'text':'E-mail/Login'}),
                                },{
                                    el: _.createEl('STRONG',null,{'text':customerData['login']})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-form-row'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Name'}),
                                },{
                                    el: _.createEl('STRONG',null,{'text':customerData['name']})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-form-row'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Surname'}),
                                },{
                                    el: _.createEl('STRONG',null,{'text':customerData['second_name']})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-form-row'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Group'}),
                                },{
                                    el: _.createEl('STRONG',null,{'data-word':groupName})
                                }
                            ]
                        },{
                            el: _.createEl('DIV','page-form-row'),
                            childes:[
                                {
                                    el: _.createEl('SPAN',null,{'data-word':'Description'}),
                                },{
                                    el: _.createEl('STRONG',null,{'text':customerData['description']})
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        return _.createTpl(tpl);
    }
    async formTpl(){
        const _ =  this;
        return _.el('DIV',{
        	class:'page-form',
					childes:[
						await _.getTpl('pageFormLeftTpl'),
						await _.getTpl('pageFormRightTpl'),
					]
				});
    }
    async showForm(item){
        const _ = this;
        Functions.showLoader(_.content);
        let
            pageFilter  = _.contentHead.querySelector('.page-filter'),
            actionBtn = _.contentHead.querySelector('.page-action button'),
            actionBtnImg = _.contentHead.querySelector('.page-action button>img'),
            customersList = _.listTpl(),
            form = await _.getTpl('formTpl');
        _.clearBody();
				actionBtnImg.setAttribute('src','/workspace/img/buttons/back.svg');
        actionBtn.setAttribute('data-click-action',`${_.componentName}:backToTable`);


        _.contentBody.append(form);
        let  pageFormLeft  = _.contentBody.querySelector('.page-form-left');
        pageFormLeft.append(customersList);
        _.listRowsTpl();
        pageFilter.style.display = 'none';
        systemConts['content'].classList.remove('wf');
        MainEventBus.trigger('languager','loadTranslate',{
            cont: _.content
        });
        Functions.hideLoader(_.content);
    }
    async backToTable(clickData){
        const _ = this;
        Functions.showLoader(systemConts['content']);
        let item = clickData['item'];
        _.clearBody();
        let
          pageFilter  = systemConts['content'].querySelector('.page-filter'),
          actionBtnImg = item.querySelector('img');
        item.setAttribute('data-click-action',`${_.componentName}:showForm`);
				actionBtnImg.setAttribute('src','/workspace/img/buttons/plus.svg');
        pageFilter.style.display = 'flex';
        MainEventBus.trigger('languager','loadTranslate',{
            cont: systemConts['content']
        });
        await _.mainContentTpl();
        Functions.hideLoader(systemConts['content']);
    }
    async mainContentTpl(){
        const _ = this;
				let
					filterTpl = await _.getTpl('filterTpl'),
					tableTpl = await _.getTpl('tableTpl');
        _.contentHead.append(filterTpl);
        _.contentBody.append(tableTpl);
        await _.tableRowsTpl({page:1});
    }
    async pageTpl(){
        const _ = this;
        _.pageHeadTpl();
        return await _.mainContentTpl();
    }
    render(page) {
        const _ = this;
        return new Promise(async function (resolve) {
            if (page === _.modulePage) {
                await _.pageTpl();
                //MainEventBus.trigger('languager','loadTranslate',systemConts['content']);
                resolve(systemConts['content'])
            }
        });
    }
}