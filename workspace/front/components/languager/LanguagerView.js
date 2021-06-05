import { systemConts } from "../../libs/Conts.lib.js";
import { Functions } from "../../libs/Functions.lib.js";
import { View } from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {TweenMax} from "../../libs/GreenSock.lib.js";
export class LanguagerView extends View {
    constructor(model){
        super(model);
        const _ = this;
				_.authorTryCnt = 0;
        _.words = [];

        _.modulePage =  'translates';

        _.pagination = null;
        _.paginationPages = 0;

        _.submitActions = {
            'add':  'Languager:saveDefaultWord',
            'edit': 'Languager:editDefaultWord'
        };

        _.clickActions = {
            'add':  'Languager:showForm',
            'edit': 'Languager:backToTable'
        };
        _.componentName = 'languager';


        MainEventBus.add(_.componentName ,'translateWord',_.translateWord.bind(_),'LanguagerView');


        MainEventBus.add(_.componentName ,'saveTranslateWordComplete',_.saveTranslateWordComplete.bind(_));
        MainEventBus.add(_.componentName,'saveDefaultWordComplete',_.saveDefaultWordComplete.bind(_));
        //
        //

        //
        MainEventBus.add(_.componentName,'showForm',_.showForm.bind(_),'LanguagerView');
        MainEventBus.add(_.componentName,'clearForm',_.clearForm.bind(_),'LanguagerView');
        MainEventBus.add(_.componentName,'backToTable',_.backToTable.bind(_),'LanguagerView');

        //
	    MainEventBus.add('Menu','showMenu',_.showMenu.bind(_),'LanguagerShowMenu');
	    _.dropdownShowed = false;
    }
		showMenu(){
      const _ = this;
      if (!_.dropdownShowed){
				TweenMax.to('.lang-dropdown',.5,{
					x: 0,
					delay: .75
				});
	      _.dropdownShowed = true;
      }else{
	      TweenMax.to('.lang-dropdown',.5,{
		      x: 1200,
		      delay: 0
	      });
	      _.dropdownShowed = false;
      }
		}
    clearForm(clickObj){
        const _ = this;
        let btn = clickObj['item'];
        let form = btn.parentNode.parentNode,
            pageHead = form.parentNode.querySelector('.page-form-right-head'),
            pageFormTitle = pageHead.querySelector('.page-subtitle');
        form.reset();
        form.setAttribute('data-submit-action',_.submitActions['add']);
        pageFormTitle.setAttribute('data-word','Adding a phrase');
    }
    saveDefaultWordError(wordObj){
        const _ = this;
        MainEventBus.trigger('Log','showLog',{
            'status': 'error',
            'title':'Ошибка в сохранении фразы',
            'text': wordObj['value'],
            'save': false
        });
    }
    saveDefaultWordComplete(wordObj){
        const _ = this;
        MainEventBus.trigger('Log','showLog',{
            'status': 'success',
            'title':'Phrase added',
            'text': wordObj['value'],
            'save': false
        });
        if(wordObj['add']){
            systemConts['content'].querySelector('.page-list').append(_.listRowTpl(wordObj));
        }

    }
    saveTranslateWordComplete(tr){
        const _ = this;
        MainEventBus.trigger('Log','showLog',{
            'status': 'success',
            'title':'Translate saved',
            'save': false
        });
        return;
    }
    async showForm(item){
        const _ = this;

        Functions.showLoader(systemConts['content']);
        let
            pageFilter  = systemConts['content'].querySelector('.page-filter'),
            pageHead  = systemConts['content'].querySelector('.page-head'),
            actionBtn = pageHead.querySelector('.page-action button'),
            actionBtnSpan = pageHead.querySelector('.page-action button img'),

            pageBody  = systemConts['content'].querySelector('.page-body'),
            list = _.listTpl(),
            form = await _.formTpl();
        _.clearBody();
        if( !form.querySelector('.page-list') ){
            form.querySelector('.page-form-left').append(list);
        }
        pageBody.append(form);

        await _.loadDefaultWords();
        actionBtnSpan.setAttribute('src','/workspace/img/buttons/back.svg');
        actionBtn.setAttribute('data-click-action',`${_.componentName}:backToTable`);
        pageFilter.style.display = 'none';
        systemConts['content'].classList.remove('wf');
        MainEventBus.trigger(_.componentName,'loadTranslate',systemConts['content']);
        Functions.hideLoader(systemConts['content']);
    }
    async loadDefaultWords(wordData = {}){
        const _ = this;
        let type = wordData['type'] ? wordData['type'] : null;
        let searchInpt = systemConts['content'].querySelector('.lang-search-value');

        if (!type){
            if(searchInpt.value){
                type = 'search';
            }else{
                type = 'main';
            }
        }
        let defaultWords = wordData['items'] ? wordData['items'] : await _.model.getDefaultWords(wordData['page']),
            rowsFragment = document.createDocumentFragment(),
            listCont = systemConts['content'].querySelector('.page-list');

        for(let word of defaultWords){
            rowsFragment.append(_.listRowTpl(word));
        }
        _.clearBody(listCont);
        Functions.showLoader(listCont);
        listCont.append(rowsFragment);
        let itemsCount =    await  MainEventBus.trigger(_.componentName,'calcItemsCount',{
            type:type,
            query: wordData['query']
         //   lang:langValue,
        });
        _.loadPagination({
            cnt: itemsCount,
            tableClass: '.page-list',
            searchMethod: 'searchDefaultWord',
            template: 'loadDefaultWords'
        });
        Functions.hideLoader(listCont);
    }
    async backToTable(item){
			const _ = this;
			Functions.showLoader(systemConts['content']);
			_.clearBody();
			let
				pageHead  = systemConts['content'].querySelector('.page-head'),
				pageFilter  = systemConts['content'].querySelector('.page-filter'),
				actionBtn = pageHead.querySelector('.page-action button'),
				actionBtnSpan = pageHead.querySelector('.page-action button img');
			actionBtn.setAttribute('data-click-action',`${_.componentName}:showForm`);
			actionBtnSpan.setAttribute('src','/workspace/img/buttons/plus.svg');
			actionBtnSpan.setAttribute('data-word','Adding a phrase');
			pageFilter.style.display = 'flex';
			await _.mainContentTpl();
			Functions.hideLoader(systemConts['content']);
    }
    async translateWord(wordsData) {
			const _ = this;
			let
				words = wordsData['words'];
			return new Promise(function (resolve) {
				for(let i=0,len = words.length;i < len;i++){
					let
						word = words[i],
						w  = word['word'],
						translate = word['translate'],
						def = word['default'],
						content = '';
					Functions.showLoader(w);
					if(translate){
						content = translate;
					}else if (def){
						content = def[0].toUpperCase() + def.slice(1,) ;
					}else{
						let rawWord = w.dataset.word;
						if( (w.hasAttribute('data-word')) && (w.getAttribute('data-word')) ) {
							rawWord = w.dataset.word[0].toUpperCase() + w.dataset.word.slice(1,);
						}
						content = rawWord ? rawWord: '';
					}
					if('placeholder' in w){
						if( w.placeholder !== content)
							w.placeholder = content;
					}else{
						w.innerHTML = content;
					}
					Functions.hideLoader(w);
					_.words = words;
			}
			MainEventBus.trigger(_.componentName,'translateReady');
			resolve(_.words);
			})
    }
    typesTpl(types){
        const  _ = this;
        let typeSelect = _.createEl('select',null,{name:'type'});
        //let typesCont = systemConts['content'].querySelector('form').elements['type'];
        for (let type of types){
            let option = new Option(type['text'],type['value']);
            _.setDataAttr(option, 'data-word',type['text']);
            typeSelect.add(option);
        }
        return typeSelect;
    }
    async langsTpl(skip=true){
			const _ = this;
			return  new Promise( async function (resolve) {
				let
					systemLang = await _.model.getSystemLang(),
					langs = await _.model.getLangs(),
					selected = {},
					langsItems = [];
				if (langs){
					langs.forEach(function (lang) {
						if (skip)	if(lang['lang'] == systemLang['lang']) return;
						if(lang['lang'] == systemLang['lang']){
							selected['selected'] = true;
						}
						langsItems.push(
							_.el('OPTION',{
								'lang-id': lang['id'],
								value: lang['lang'],
								text: lang['value'],
								...selected,
							})
						);
						selected = {};
					})
				}
				resolve(langsItems);
			});
    }
    async filterTpl(){
        const _ = this;
        return new Promise(async function (resolve) {
        	let tpl = _.el(
        		'DIV',{
						class: 'page-filter',
						childes:[
							_.el('DIV',{
								class: 'lang-select',
								childes:[
									_.el('DIV',{
										class:'page-inpt',
										childes:[
											_.el('SPAN',{
												'data-word':'Choose System language'
											}),
											_.el('SELECT',{
												'data-change-action':`${_.componentName}:changeSystemLang`,
												childes: await _.langsTpl(false)
											}),
										]
									})
								]
							}),
							_.el('DIV',{
								class: 'lang-select',
								childes:[
									_.el('DIV',{
										class:'page-inpt',
										childes:[
											_.el('SPAN',{
												'data-word':'Choose language'
											}),
											_.el('SELECT',{
												class:'lang-sel',
												'data-change-action':`${_.componentName}:changeTranslateLang`,
												childes: await _.langsTpl()
											}),
										]
									})
								]
							}),
							_.el('DIV',{
								class: 'page-search',
								childes:[
									_.el('DIV',{
										class:"page-inpt",
										childes:[
											_.el('INPUT',{
												class: 'lang-search-value',
												type:"text",
												'data-word':'Search',
												'data-search-method': 'searchWord',
												'data-input-action':`${_.componentName}:inputSearchQuery`,
												'data-keyup-action':`${_.componentName}:keyUpSearch`
											}),
											_.el('BUTTON',{
												class: 'page-btn',
												'data-search-method': 'searchWord',
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
        	if(!_.contentHead.querySelector('.page-filter')){
						_.contentHead.append(tpl);
					}
					resolve(_.contentHead);
        });
    }
    pageHeadTpl(pageData = {}){
			const _ =  this;
			_.clearBody(_.contentHead);
			return new Promise(function (resolve) {
				let tpl = _.el(
					'temp',{
					childes:[
						_.el('H1',{
							class:'page-title',
							'data-word':'Translates'
						}),
						_.el('DIV',{
							class:'page-action',
							childes:[
								_.el('BUTTON',{
									class:'btn',
									'data-click-action': `${_.componentName}:showForm`,
									childes:[
										_.el('IMG',{
											src:'/workspace/img/buttons/plus.svg'
										})
									]
								})
							]
						})
					]
				});
				_.contentHead.append(tpl);
				resolve(_.contentHead);
			})
    }
    tableTpl(){
        const _ = this;
        let tpl = {
            el: _.createEl('TABLE','page-table'),
            childes: [{
                el: _.createEl('THEAD'),
                childes: [{
                    el:_.createEl('TR'),
                    childes: [{
                        el:_.createEl('TH','digit',{text:"ID"})
                    },{
                        el:_.createEl('TH',null,{'data-word':'Phrase'})
                    },{
                        el:_.createEl('TH',null,{'data-word':'Translate'})
                    },{
                        el:_.createEl('TH',null,{'data-word':'Type'})
                    }
                    ]
                }]
            },{
                el: _.createEl('TBODY')
            }
            ]
        };
        let buffer = _.createTpl(tpl,'LanguagerTableContTpl');
        systemConts['content'].querySelector('.page-body').append(buffer);
        return  Promise.resolve(systemConts['content'].querySelector('.page-body'));
    }
    tableRowTpl(rowData){
       const _ = this;
       let tpl = {
            el:_.createEl('TR'),
            childes: [{
                el:_.createEl('TD','digit',{text:`${rowData['id']}`})
            },{
                el:_.createEl('TD',null),
                childes:[
                    {  el:_.createEl('DIV',null,{
                            'data-click-action':`${_.componentName}:showModalTranslate`,
                            'data-text':`${rowData['value']}`,
                            'text':`${Functions.cutText(rowData['value'],250)}`
                        }) }
                ]
            },{
                el:_.createEl('TD'),
                childes:[
                    { el:_.createEl('TEXTAREA','inpt word-translate',
                    {
                        'data-word-text':`${rowData['translate']}`,
                        'data-word-id':`${rowData['id']}`,
                        'data-outfocus-action':`${_.componentName}:saveTranslateWord`,
                        text:`${rowData['translate'] ? rowData['translate'] : ''}`
                    })
                    }
                ]
            },{
                el:_.createEl('TD',null,{'data-word':`${rowData['type']}`})
            }]
        };
       return _.createTpl(tpl);
    }
    loadToEditForm(wordData){
        const _ = this;
        let form = systemConts['content'].querySelector('form');
        form.elements['value'].setAttribute('data-id',wordData['id']);
        form.elements['value'].value = wordData['text'];
        form.elements['type'].value = wordData['type'];

        form.setAttribute('data-submit-action',`${_.componentName}:editDefaultWord`);

        let subHead = systemConts['content'].querySelector('.page-form-right-head'),
            subTitle =  subHead.querySelector('.page-subtitle');
        if(subTitle.getAttribute('data-word') != 'Edit a phrase'){
            subTitle.setAttribute('data-word','Edit a phrase');
        }
    }
    listTpl(type='main'){
        const _ = this;
        let tpl = {
            el: _.createEl('UL','page-list')
        };
        let buffer = _.createTpl(tpl,'LanguagerListTpl');
        return buffer;
    }
    listRowTpl(wordData){
        const _ = this;
        let tpl = {
            el: _.createEl("LI"),
            childes:[
                {
                    el:  _.createEl("BUTTON"),
                }
            ]
        };
        let listRow = _.createTpl(tpl);
        _.updateEl(listRow.querySelector('button'),null,{
            'data-word-text': wordData['value'],
            'data-word-id':wordData['id'],
            'data-word-type':wordData['type'],
            'data-click-action':`${_.componentName}:editWord`,
            type:'button',
            text:Functions.cutText(wordData['value'],25)
        });
        return listRow;
    }
    async formTpl(){
			const _ =  this;
			let wordTypes = await _.model.getWordTypes();
			let tpl  = {
				el:_.createEl('DIV','page-form'),
				childes: [
					{
							el: _.createEl('DIV','page-form-left'),
							childes:[
									{
											el: _.createEl('DIV','page-search'),
											childes: [{
													el:_.createEl('DIV','page-inpt'),
													childes: [{
															el:_.createEl('INPUT','lang-search-value',{
																	type:"text",
																	'data-word':'Search',
																	'data-search-method': 'searchDefaultWord',
																	'data-template': 'loadDefaultWords',
																	'data-input-action':`${_.componentName}:inputSearchQuery`,
																	'data-keyup-action':`${_.componentName}:keyUpSearch`,
															})
													},{
															el:_.createEl('BUTTON','page-btn',{
																	'data-search-method': 'searchDefaultWord',
																	'data-template': 'loadDefaultWords',
																	'data-click-action':`${_.componentName}:btnSearch`
															}),
															childes:[
																	{
																			el:_.createEl('IMG',null,{src:"/workspace/img/search.svg"})
																	}
															]
													}]
											}]
									}
							]
					},{
						el: _.createEl('DIV','page-form-right'),
						childes: [
							{
									el: _.createEl('DIV','page-form-right-head'),
									childes:[
											{el: _.createEl('H2','page-subtitle',{'data-word':'Adding a phrase'})}
									]
							},
							{
								el: _.createEl('FORM','page-form-body',{'data-submit-action':`${_.componentName}:saveDefaultWord`}),
								childes:[
									{
											el: _.createEl('DIV','page-text'),
											childes:[
													{
															el: _.createEl('SPAN',null,{'data-word':'Phrase'}),
													},{
															el: _.createEl('TEXTAREA',null,{name:'value',}),
													}
											]
									}, {
												el: _.createEl('DIV','page-inpt'),
												childes:[
														{
																el: _.createEl('SPAN',null,{'data-word':'Type'}),
														},{
																el: _.typesTpl(wordTypes)
														}
												]
										},{
												el: _.createEl('DIV','page-do'),
												childes:[
														{
																el: _.createEl('BUTTON','btn',{'data-word':'Clear','type':'button','data-click-action':`${_.componentName}:clearForm`})
														},
														{
																el: _.createEl('BUTTON','btn btn-large',{'data-word':'Save','type':'submit'})
														}
												]
										}
								]
							}
						]
					}
				]
			};
			let buffer = _.createTpl(tpl);
			return buffer;
    }
    async mainContentTpl(){
			const _ =  this;
			await _.filterTpl();
			await _.tableTpl();
			let langSelect = _.contentHead.querySelector('.lang-sel'),
					langValue = langSelect.options[langSelect.selectedIndex].value;
			await _.tableRowsTpl({
					page:1,
					lang: langValue
			});
			MainEventBus.trigger(_.componentName,'loadTranslate',{
				cont: _._content
			});
    }
    async pageTpl(){
        const _ =  this;
        await _.pageHeadTpl();
        _.mainContentTpl();
        return systemConts['content'];
    }
    async loadLangOptions(){
			const  _ = this;
			let
				dropdown = [],
				langs = await _.model.getLangs(),
				currentLang = _.model.currentLang;
			for(let lang of langs){
				let btnLangParams = {
					'data-click-action':`${_.componentName}:changeLang`,
					value:`${lang['lang']}`,
					text:`${lang['lang']}`
				};
				if(lang['lang'] == currentLang){
					btnLangParams['class'] = 'active';
				}
				dropdown.push(_.el('BUTTON',btnLangParams));
			}
			return dropdown;
    }
    async authorTpl(place){
			const _ = this;
			if(_.head.querySelector('.lang-select')) return;
			let
				formRight = _.main.querySelector(place);
			if(formRight){
				let
					tpl = _.el('DIV',{
						class:'lang-select',
						childes:await _.loadLangOptions()
					})
				formRight.append(tpl);
				clearInterval(_.authorInt);
			}else{
				_.authorInt = setInterval(()=>{
					if(_.authorTryCnt >= 5){
						clearInterval(_.authorInt);
						throw new Error(`Module not loaded. Attempts counter: ${_.authorTryCnt}`);
					}else{
						_.authorTryCnt++;
						_.authorTpl(place);
					}
				},1000);
			}
			return formRight;
    }
    async render(page) {
			const _ = this;
			return new Promise(async function (resolve) {
				if( page === _.modulePage){
					let content =  await _.pageTpl();
					resolve(content);
				}
				if( page === '/'){
					resolve(_.authorTpl('.form-right'));
				}else{
					resolve(_.authorTpl('core-head'));
				}
			});
    }
}