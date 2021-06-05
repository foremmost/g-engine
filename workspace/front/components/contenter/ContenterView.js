import { View } from "../main/View.js";
import { MainEventBus } from "../../libs/MainEventBus.lib.js";
import { Tynt } from "../../libs/Tynt.lib.js";
export class ContenterView extends View {
  constructor(model){
    super(model);
    const _ = this;
    _.componentName = 'contenter';
    _.modulePage = 'content';
    //
    _.busProp = 'ContenterView';
    MainEventBus
      .on(_,'showForm')
      .on(_,'backToTable')
      .on(_,'editService')
      .on(_,'showServicesTpl')
      .on(_,'showPartnersTpl')
      .on(_,'showProjectsTpl')
      .on(_,'showNewsTpl')
      .on('filer','changeFile',_.changeThumbnail.bind(_))
 //   MainEventBus.add(_.componentName,'clearForm',_.clearForm.bind(_),`${_.componenName}View`);
  //  MainEventBus.add(_.componentName,'backToTable',_.backToTable.bind(_),`${_.componenName}View`);
  }
	setActiveTab(clickData){
  	const _ = this;
  	for(let tab of _.head.querySelectorAll('core-tabs-item')){
  		tab.classList.remove('active');
  	}
		_.head.querySelector(`[data-action='${clickData['item'].dataset.action}']`).classList.add('active');
	}
	async showServicesTpl(clickData){
  	const _ = this;
		_.clearContent();
		_.setActiveTab(clickData);
  	await _.pageTpl({
		  headTitle: 'Services',
		  page: 1,
		  type: '144'
	  });
		
		MainEventBus.trigger('languager','loadTranslate',{cont:_.content});
	}
	async showPartnersTpl(clickData){
  	const _ = this;
		_.clearContent();
		_.setActiveTab(clickData);
  	await _.pageTpl({
		  headTitle: 'Partners',
		  page: 1,
		  type: '146'
	  });
		MainEventBus.trigger('languager','loadTranslate',{cont:_.content});
	}
	async showProjectsTpl(clickData){
  	const _ = this;
		_.clearContent();
		_.setActiveTab(clickData);
  	await _.pageTpl({
		  headTitle: 'Projects',
		  page: 1,
		  type: '147'
	  });
		MainEventBus.trigger('languager','loadTranslate',{cont:_.content});
	}
	async showNewsTpl(clickData){
  	const _ = this;
		_.clearContent();
		_.setActiveTab(clickData);
  	await _.pageTpl({
		  headTitle: 'News',
		  page: 1,
		  type: '145'
	  });
		MainEventBus.trigger('languager','loadTranslate',{cont:_.content});
	}
  async contentHeadTpl(pageData = {}){
      const _ =  this;
      return new Promise(function (resolve) {
          let tpl = _.el(
            'temp',{
              childes:[
                _.el('H1',{
                	prop: 'serviceTitle',
                  class: 'page-title',
                  'data-word': pageData['headTitle']
                }),
                _.el('DIV',{
                	class:'page-action',
	                childes:[
	                  _.el('BUTTON',{
	                  	class: 'btn',
		                  prop: 'saveBtn',
		                  'data-click-action':`${_.componentName}:showForm`,
		                  'data-tpl':'serviceFormTpl',
											childes:[
												_.el('IMG',{
													src:'/workspace/img/buttons/plus.svg'
												})
											]
	                  })
	                ]
                })
              ]
            }
          );
          resolve(tpl);
      })
  }
	async backToTable(){
		const _ = this;
		_.clearContent();
    await _.pageTpl();
		
		MainEventBus.trigger('languager','loadTranslate',{cont:_.content});
  }
  showForm(clickData){
	  const _ = this;
  	return new Promise(async function (resolve){
	    let btn = clickData['item'],
		      tplName = btn.dataset.tpl;
	    _.clearCont(_.contentBody);
	    let
				tpl = await _.getTpl(tplName,{
					save:false,
					id:clickData['id'],
					langId:clickData['langId']
				}),
			pageAction = _.contentHead.querySelector('.page-action');
	    _.contentBody.append(tpl);
	    _.saveBtn.classList.add('bg-green');
	    _.saveBtn.setAttribute('data-word','Save');
	    _.saveBtn.setAttribute('data-click-action',`${_.componentName}:save`);
	    _.saveBtn.removeAttribute('data-lang');
	    if(_.head.querySelector('core-tabs-item.active')){
		    let action = _.head.querySelector('core-tabs-item.active').getAttribute('data-action');
			  pageAction.append(_.el('BUTTON',{
					class:'btn',
					'data-action':action,
					'data-click-action':`${_.componentName}:${action}`,
					childes:[
						_.el('IMG',{
							src:'/workspace/img/buttons/back.svg'
						})
					]
				}));
	    }
		  await Tynt.init();
		  MainEventBus.trigger('languager','loadTranslate',tpl);
		  resolve(Tynt);
	  });
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
	async editService(clickData) {
  	const _ = this;
  	let
	    btn = clickData['item'],
	    serviceId = btn.dataset.id;
  	MainEventBus.trigger(_.componentName,'fillForm',{
  		btn: btn,
  		itemId: serviceId
	  });
	}
	
	thumbnailTpl(thumbData){
		const _ = this;
		
		return _.el('DIV',{
			class:'page-thumb',
			childes:[
				_.el('DIV',{
					class: "page-thumb-head",
					childes:[
						_.el('SPAN',{
							'data-word':'image'
						})
					]
				}),
				_.el('DIV',{
					prop: 'thumbBody',
					class: "page-thumb-body",
					childes:[
						_.el('IMG',{
							prop:'mainImage',
							class: 'page-thumb-main',
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
  async serviceFormTpl(serviceData){
  	const _ =  this;
		_.serviceTitle.removeAttribute('data-lang');
		_.serviceTitle.setAttribute('data-word',"Adding a item");
		let
			
			systemLang = await MainEventBus.trigger('languager','getSystemLang');
		let langs = [];
		for (let i = 0; i < _.languages.length; i++){
			let lang = _.languages[i],cl = 'btn lang-btn';
			if(lang['id'] == systemLang['id']) cl+=' active';
			langs.push(_.el('BUTTON',{
				class: cl,
				'data-lang-id': lang['id'],
				'data-item-id': serviceData['id'],
				'data-click-action':`${_.componentName}:translateForm`,
				text: lang['value']
			}));
		}
		let pageType = _.contentHead.dataset.type;
  	return _.el("FORM",{
  		class:'page-form',
		  childes:[
		  _.el('DIV',{
		  	class:'page-form-left',
		  	childes:[
		  		_.el('INPUT',{
		  			prop:'itemLang',
		  			type:'hidden',
						name:'lang_id',
						value: systemLang['id'],
					}),
		  		_.el('INPUT',{
		  			prop:'commonId',
		  			type:'hidden',
						name:'common_id',
						value: null,
					}),
					_.el('H4',{
						class:'page-subtitle',
						text: 'Translates'
					}),
					_.el('DIV',{
						class:'page-langs',
						childes:langs
					}),
				  _.thumbnailTpl(serviceData),
			    _.el('INPUT',{
			    	prop:'itemId',
			    	name: 'id',
			    	type:'hidden'
			    })
			  ]
		  }),
		  _.el('DIV',{
		  	class:'page-form-right',
		  	childes:[
					_.el('H4',{
						class:'page-subtitle',
						'data-word': 'Service'
					}),
					_.el('DIV',{
						class:'page-row',
						childes:[
						_.el('INPUT',{type:'hidden',name:pageType}),
							_.inptTpl({title:'Title',name:'title',class:'full'}),
							_.inptTpl({title:'Link',name:'link',class:'full'}),
							_.inptTpl({title:'Short',name:'short',class:'full'}),
							_.el('DIV',{
								class:'page-tynt',
								childes:[
									_.el('SPAN',{
										'data-word':'Description'
									}),
									_.el('DIV',{
										class:'page-tynt-body'
									})
								]
							})
						]
					})
			  ]
		  }),
		  ]
	  });
  }
  tableTpl(){
    const _ = this;
    return _.el(
      "TABLE",{
        class: 'page-table',
        childes:[
          _.el('THEAD',{
              childes:[
                _.el('TH',{text:'№'}),
                _.el('TH',{'data-word':'Title'}),
                _.el('TH',{'data-word':'Image'}),
                _.el('TH',{'data-word':'Date'}),
                _.el('TH',{'data-word':'Languages'}),
                _.el('TH',{'data-word':'#'})
		          ]
	        }),
          _.el('TBODY')
	      ]
    });
  }
  serviceRowTpl(item){
	  const _ = this;
	  let langs = [];
	  for (let i=0; i < item['translates'].length;i++){
	  	let translate = item['translates'][i];
	  	let lang = translate['lang_id'];
			let language = _.languages.filter( (el) => el['id'] == lang);
	  	lang = language[0]['lang']
	  	langs.push(
	  		_.el('BUTTON',{
	  			class:'btn',
					text: lang
				})
			);
		}
		
	  return _.el('TR',{
		  childes:[
			  _.tdTpl({text:item['id']}),
			  _.tdTpl({text:item['title']}),
			  _.el('TD',{
				  childes:[
					  _.el('DIV',{
						  childes:[
							  _.el('IMG',{src:`/uploads/${item['image']}`})
						  ]
					  })]
			  }),
			  _.tdTpl({text:item['date']}),
			  _.el('TD',{
			  	childes: langs
				}),
			  _.el('TD',{
				  childes:[
					  _.el('DIV',{
						  class: 'page-table-actions',
						  childes:[
							  _.el('BUTTON',{
								  class:'page-btn',
								  'data-tpl':'serviceFormTpl',
								  'data-id':item['id'],
								  'data-click-action':`${_.componentName}:editService`,
								  childes:[
									  _.el('IMG',{src:'/workspace/img/edit.svg'})
								  ]
							  }),
							  _.el('BUTTON',{
								  class:'page-btn',
									'data-id':item['id'],
									'data-click-action':`${_.componentName}:delete`,
								  childes:[
									  _.el('IMG',{src:'/workspace/img/delete.svg'})
								  ]
							  })
						  ]
					  })]
			  })
		  ]
	  });
  }
  async tableRowTpl(item){
    const _ = this;
    return  _.serviceRowTpl(item);
  }
	tabsTpL(){
		const _ = this;
		return _.el('CORE-TABS',{
			childes:[
				_.el('CORE-TABS-ITEM',{
					class:'active',
					'data-action': 'showServicesTpl',
					'data-click-action':`${_.componentName}:showServicesTpl`,
					childes:[
						_.el('CORE-TABS-ITEM-TEXT',{
							'data-word':`Services`
						})
					]
				}),
				_.el('CORE-TABS-ITEM',{
					'data-action': 'showProjectsTpl',
					'data-click-action':`${_.componentName}:showProjectsTpl`,
					childes:[
						_.el('CORE-TABS-ITEM-TEXT',{
							'data-word':`Projects`
						})
					]
				}),
				_.el('CORE-TABS-ITEM',{
					'data-action': 'showNewsTpl',
					'data-click-action':`${_.componentName}:showNewsTpl`,
					childes:[
						_.el('CORE-TABS-ITEM-TEXT',{
							'data-word':`News`
						})
					]
				}),
				_.el('CORE-TABS-ITEM',{
					'data-action': 'showPartnersTpl',
					'data-click-action':`${_.componentName}:showPartnersTpl`,
					childes:[
						_.el('CORE-TABS-ITEM-TEXT',{
							'data-word':`Партнёры`
						})
					]
				})
			]
		});
	}
	
  async pageTpl(pageData){
    const _ = this;
    _.languages = await MainEventBus.trigger('languager','getLangs');
	  pageData  = pageData ? pageData : {};
	  if (!pageData['headTitle']) pageData['headTitle'] = "Services";
    return new Promise(async function (resolve){
	    let
	      contentHeadTpl = await _.getTpl('contentHeadTpl',{headTitle:pageData['headTitle'],save:false}),
	      tabsTpl = await _.getTpl('tabsTpL'),
	      tableTpl = await _.getTpl('tableTpl',{save:false});
	    
	    if(!_.exsistTpl('tabsTpl'))
	      _.head.append(tabsTpl);
	    _.contentHead.append(contentHeadTpl);
      _.contentBody.append(tableTpl);
     
	    if (!pageData['page']) pageData['page'] = 1;
	    if (!pageData['type']) pageData['type'] = '144';
	
			_.contentHead.setAttribute('data-type',pageData['type']);
	 

	    await _.tableRowsTpl(pageData,true);
      
      resolve(true);
    });
  }
  async render(page) {
    const _ = this;
    return new Promise(async function (resolve) {
        if( page === _.modulePage){
            let content = await _.pageTpl();
	        _.contentHead.setAttribute('data-type','144');
            resolve(content);
        }else{
          resolve(true);
        }
    });
  }
}