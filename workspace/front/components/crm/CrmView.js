import {View} from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";

export class CrmView extends View {
  constructor(model){
		super(model);
		const _ = this;
		_.componentName = 'crm';
		_.modulePage = 'crm';
		//
		MainEventBus
			.on(_,'showFormTemplatesTpl')
			.on(_,'showOrdersTpl')
			.on(_,'showCartTpl');
  }
  pageHeadTpl(pageData = {}){
		const _ =  this;
		return new Promise(function (resolve) {
			resolve(_.el('temp',{
				childes:[
					_.el('H1',{
						class: 'page-title',
						'data-word': pageData['title']
					})
				]
			}));
		})
  }
  filterTpl(){
      const _ = this;
      return new Promise(function (resolve) {
          let tpl = _.el('DIV',{
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
                                'data-search-method': 'search',
                                'data-input-action':`${_.componentName}:inputSearchQuery`,
                                'data-keyup-action':`${_.componentName}:keyUpSearch`
                              }),
                              _.el('BUTTON',{
                                class: 'page-btn',
                                'data-search-method': 'search',
                                'data-click-action':`${_.componentName}:btnSearch`,
                                childes:[
                                    _.el('IMG',{src:"/workspace/img/search.svg"})
                                ]
                              })
                          ]
                        })
                  ]
                })
            ]
          });
          resolve(tpl);
      });
  }
  tabsTpL(){
		const _ = this;
		return _.el('CORE-TABS',{
			childes:[
				_.el('CORE-TABS-ITEM',{
					class:'active',
					'data-click-action':`${_.componentName}:showOrdersTpl`,
					childes:[
						_.el('CORE-TABS-ITEM-TEXT',{
							'data-word':`Orders`
						})
					]
				}),
				_.el('CORE-TABS-ITEM',{
					'data-click-action':`${_.componentName}:showCartTpl`,
					childes:[
						_.el('CORE-TABS-ITEM-TEXT',{
							'data-word':`Cart orders`
						})
					]
				}),
				/*_.el('CORE-TABS-ITEM',{
					'data-click-action':`${_.componentName}:showFormTemplatesTpl`,
					childes:[
						_.el('CORE-TABS-ITEM-TEXT',{
							'data-word':`Form Templates`
						})
					]
				}),
			_.el('CORE-TABS-ITEM',{
				'data-click-action':`${_.componentName}:showEmailTemplatesTpl`,
				childes:[
					_.el('CORE-TABS-ITEM-TEXT',{
						'data-word':`Email Templates`
					})
				]
			})*/
			]
		});
  }
  async ordersTableTpl(){
		const _ = this;
		return new Promise(function(resolve){
			resolve(_.el('TABLE',{
				class:'page-table',
				prop:'ordersTable',
				childes:[
					_.el('THEAD',{
						childes:[
							_.el('TR',{
								childes:[
									_.el('TH',{
										class:"digit",
										text: "ID"
									}),
									_.el('TH',{
										'text': 'Email'
									}),
									_.el('TH',{
										'data-word': 'Phone'
									}),
									_.el('TH',{'data-word':'Name'}),
									_.el('TH',{'data-word':'Order form'}),
									_.el('TH',{
										'data-word': 'Date'
									}),
									_.el('TH',{class:'digit','text':'#'}),
								]
							})
						]
					}),
					_.el('TBODY')
				]
			}));
		});
  }
	async cartTableTpl(){
		const _ = this;
		return new Promise(function(resolve){
			resolve(_.el('TABLE',{
				class:'page-table',
				prop:'cartTable',
				childes:[
					_.el('THEAD',{
						childes:[
							_.el('TR',{
								childes:[
									_.el('TH',{
										class:"digit",
										'data-word': "Order id"
									}),
									_.el('TH',{
										'data-word': 'User id'
									}),
									_.el('TH',{'data-word':'E-mail'}),
									_.el('TH',{class:"digit",'data-word':'Goods cnt'}),
									_.el('TH',{'data-word':'Date'}),
									_.el('TH',{class:"digit",'text':'#'}),
								]
							})
						]
					}),
					_.el('TBODY')
				]
			}));
		});
	}
	cartRowTpl(rowData){
  	const  _ = this;
		return _.el(
		"TR",{
			childes:[
				_.el('TD',{
					class: 'digit',
					text: rowData['id']
				}),
				_.tdTpl({
					text: rowData['u_id']
				}),
				_.tdTpl({
					text: rowData['login']
				}),
				_.tdTpl({
					class:'digit',
					text: rowData['cnt']
				}),
				_.tdTpl({
					text: rowData['date']
				}),
			/*	_.el('TD',{
					childes:[
						_.el('DIV',{
							class:'page-table-actions',
							childes:[
								_.el('BUTTON',{
									class:'page-btn',
									'data-order-id':`${rowData['id']}`,
									type:'button',
									'data-click-action':`${_.componentName}:showOrder`,
									childes:[
										_.el('IMG',{
											src:'/workspace/img/show.svg'
										})
									]
								}),
								_.el('BUTTON',{
									class:'page-btn',
									'data-order-id':`${rowData['id']}`,
									type:'button',
									'data-click-action':`${_.componentName}:deleteOrder`,
									childes:[
										_.el('IMG',{
											src:'/workspace/img/delete.svg'
										})
									]
								})
							]
						})
					]
				})*/
			]});
	}
	tableRowTpl(rowData,params){
		const _ = this;
		if(params['rowType'] == 'cart'){
			return _.cartRowTpl(rowData);
		}
		return _.el(
			"TR",{
			childes:[
				_.el('TD',{
					class: 'digit',
					text: rowData['id']
				}),
				_.tdTpl({
					text: rowData['email']
				}),
				_.tdTpl({
					text: rowData['phone']
				}),
				_.tdTpl({
					text: rowData['name']
				}),
				_.tdTpl({
					text: rowData['form_order']
				}),
				_.tdTpl({
					text: rowData['date']
				}),
				_.el('TD',{
					childes:[
						_.el('DIV',{
							class:'page-table-actions',
							childes:[
								_.el('BUTTON',{
									class:'page-btn',
									'data-order-id':`${rowData['id']}`,
									type:'button',
									'data-click-action':`${_.componentName}:showOrder`,
									childes:[
										_.el('IMG',{
											src:'/workspace/img/show.svg'
										})
									]
								}),
								_.el('BUTTON',{
									class:'page-btn',
									'data-order-id':`${rowData['id']}`,
									type:'button',
									'data-click-action':`${_.componentName}:deleteOrder`,
									childes:[
										_.el('IMG',{
											src:'/workspace/img/delete.svg'
										})
									]
								})
							]
						})
					]
				})
		]});
		
  }
  async ordersContentTpl(){
		const _ = this;
		await _.ordersTableTpl();
  }
  async pageTpl(){
    const _ = this;
		_.clearBody(_.contentHead);
  
		let pageHeadTpl = await _.getTpl('pageHeadTpl',{
			save: false,
			title: 'Orders',
		});
		let filterTpl = await _.getTpl('filterTpl',{save:true});
		pageHeadTpl.append(filterTpl);
		_.contentHead.append(pageHeadTpl);
	
		let tableTpl = await _.getTpl('ordersTableTpl');
	
		_.contentBody.append(tableTpl);
	
		await _.ordersContentTpl();
    let tabsTpl = await _.getTpl('tabsTpL',{
      save:'true'
    });
    _.head.append(tabsTpl);
		await _.tableRowsTpl({
			page:1,
			type: 'main'
		});
		
		MainEventBus.trigger('languager', 'loadTranslate', {
			cont: _._content
		});
  }
  fieldTypesTpl() {
    const _ = this;
    return [_.el(
      'OPTION',{
        'data-word': '1 type',
        value: 1
      }
    )];
  }
  async formFieldsTpl(){
    const _ = this;
    return new Promise(function (resolve) {
      resolve([
        _.el('BUTTON',{
          class:'btn',
          type:'button',
          'data-word':'Add field',
          'data-click-action':`${_.componentName}:addField`
        }),
        _.el('DIV',{
          class:'page-inpt',
          childes:[
            _.el('SPAN',{'text':'Name'}),
            _.el('INPUT',{'text':'name',name:'name'}),
          ]
        }),
        _.el('DIV',{
          class:'page-inpt',
          childes:[
            _.el('SPAN',{'data-word':'Alias'}),
            _.el('INPUT',{'text':'name',name:'alias'}),
          ]
        }),
        _.el('DIV',{
          class:'page-check',
          childes:[
            _.el('INPUT',{type:'checkbox',id:'1',name:'required'}),
            _.el('LABEL',{for:'1',
              childes:[
                _.el('STRONG',{'data-word':'Required'}),
                _.el('SPAN'),
              ]
            }),
          ]
        }),
        _.el('DIV',{
          class:'page-inpt',
          childes:[
            _.el('SPAN',{'data-word':'Size'}),
            _.el('INPUT',{'data-word':'Size',name:'size'}),
          ]
        }),
        _.el('DIV',{
          class:'page-inpt',
          childes:[
            _.el('SPAN',{'data-word':'Type'}),
            _.el('SELECT',{
              childes: _.fieldTypesTpl(),
              'data-change-action':`${_.componentName}:changeFormType`
            }),
          ]
        }),
      ]);
    })
  }
  formTemplatesTpl(){
			const _ = this;
			return new Promise(async function(resolve){
				 let tpl =

						 _.el('temp',{
							 childes:[
								 _.el('DIV',{
									 class: 'page-form-left',
									 childes:[
										 _.el('DIV',{
											 class:'page-inpt',
											 childes:[
												 _.el('SPAN',{'data-word':'Form name'}),
												 _.el('INPUT',{'data-word':'Form name'}),
											 ]
										 }),
										 _.el('DIV',{
											 class:'page-inpt',
											 childes:[
												 _.el('SPAN',{'data-word':'Form action'}),
												 _.el('INPUT',{'data-word':'Form action'}),
											 ]
										 }),
										 _.el('DIV',{
											 class:'page-inpt',
											 childes:[
												 _.el('SPAN',{'data-word':'Form method'}),
												 _.el('INPUT',{'data-word':'Form method'}),
											 ]
										 }),
										 _.el('DIV',{
											 class:'form-fields',
											 childes: await _.getTpl('formFieldsTpl')
										 })
									 ]
								 }),
								 _.el('DIV',{
										 class:'page-form-right',
										 childes:[
											 _.el('H3',{
												 class:'page-subtitle',
												 'data-word':' Form fields:'
											 }),
										 ]
									 })
							 ]
						 });
				resolve(tpl)
			});
	}
  async showFormTemplatesTpl(clickData){
      const _ = this;
      let tab = clickData['item'],
          pageHead = systemConts['content'].querySelector('.page-head'),
          pageBody = systemConts['content'].querySelector('.page-body');
      _.selectCurrentTab(tab);
      _.clearCont(pageBody);
      if (pageHead.querySelector('.page-filter')) pageHead.querySelector('.page-filter').remove();
      let pageTitle  = pageHead.querySelector('.page-title');
      _.updateEl(pageTitle,'page-title',{'data-word':'Form templates'});
      let formTemplatesTpl = await _.formTemplatesTpl();
      pageBody.append(formTemplatesTpl);

      await MainEventBus.trigger('languager', 'loadTranslate');
  }
  async showOrdersTpl(clickData){
		const _ = this;
		let tab = clickData['item'];
		_.selectCurrentTab(tab);
		_.clearBody();
		let tableTpl = await _.getTpl('ordersTableTpl');
	
		_.contentBody.append(tableTpl);
	
		await _.ordersContentTpl();
		let tabsTpl = await _.getTpl('tabsTpL',{
			save:'true'
		});
		//_.head.append(tabsTpl);
		await _.tableRowsTpl({
			page:1,
			type: 'main'
		});
	
		MainEventBus.trigger('languager', 'loadTranslate', {
			cont: _._content
		});
  }
  
  async showCartTpl(clickData){
		const _ = this;
		let tab = clickData['item'];
		_.selectCurrentTab(tab);
		_.clearContent();
		let pageHeadTpl = await _.getTpl('pageHeadTpl',{
			save:false,
			title: 'Cart',
		});
		_.contentHead.append(pageHeadTpl);
		let cartTable = await _.getTpl('cartTableTpl',{save:false});
		
		_.contentBody.append(cartTable);
		
		let items = await _.model.getCartOrders({
			page:1
		})
		console.log(items);
		await _.tableRowsTpl({
			page:1,
			type: 'main',
			items: items,
			rowType: 'cart',
			rebuild: true
		});
		MainEventBus.trigger('languager', 'loadTranslate', {
			cont: _._content
		});
	}
  
  async formToShowTpl(orderId){
      const _ =  this;
      let orderData  = await _.model.getOneItem({itemId:orderId});
      let tpl = {
          el: _.createEl('DIV','page-form-right  modal-form',{style:"width:100%;min-width:450px"}),
          childes: [
              {
                  el: _.createEl('H2','page-subtitle',{'data-word':'Order info'})
              },{
                  el: _.createEl('DIV','page-form-body'),
                  childes:[
                      {
                          el: _.createEl('DIV','page-form-row'),
                          childes:[
                              {
                                  el: _.createEl('SPAN',null,{'text':'E-mail'}),
                              }, {
                                  el: _.createEl('STRONG', null, {'text': orderData['email']})
                              }
                          ]
                      },{
                          el: _.createEl('DIV','page-form-row'),
                          childes:[
                              {
                                  el: _.createEl('SPAN',null,{'data-word':'Name'}),
                              },{
                                  el: _.createEl('STRONG',null,{'text':orderData['name']})
                              }
                          ]
                      },{
                          el: _.createEl('DIV','page-form-row'),
                          childes:[
                              {
                                  el: _.createEl('SPAN',null,{'data-word':'Phone'}),
                              },{
                                  el: _.createEl('STRONG',null,{'text':orderData['phone']})
                              }
                          ]
                      },{
                          el: _.createEl('DIV','page-form-row'),
                          childes:[
                              {
                                  el: _.createEl('SPAN',null,{'data-word':'Order form'}),
                              },{
                                  el: _.createEl('STRONG',null,{'data-word':orderData['form_order']})
                              }
                          ]
                      },{
                          el: _.createEl('DIV','page-form-row'),
                          childes:[
                              {
                                  el: _.createEl('SPAN',null,{'data-word':'Date'}),
                              },{
                                  el: _.createEl('STRONG',null,{'text':orderData['date']})
                              }
                          ]
                      }
                  ]
              }
          ]
      };
      return _.createTpl(tpl);
  }
  async render(page) {
		const _ = this;
		return new Promise(async function (resolve) {
			if( page === _.modulePage){
				resolve(_.pageTpl());
			}else{
				resolve(true);
			}
		});
  }
}