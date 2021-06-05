import { Modaler } from "../../libs/Modaler.lib.js";
import { Animation } from "../../libs/Animation.lib.js";
import { systemConts } from "../../libs/Conts.lib.js";
import { Ctrl } from "../main/Ctrl.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
export class LanguagerCtrl  extends Ctrl  {
    constructor(model,view){
        super(model,view);
        const _ = this;
        _.componentName = 'languager';
        _.busProp = 'LanguagersCtrl';
        _.model.translates = new Map();
        MainEventBus
					.add('Loader','modulesLoaded',_.initLoadTranslate.bind(_),'LanguagerCtrl') // Инициализационная загрука страницы
        	.add('Loader','pageReady',_.pageLoadTranslate.bind(_),'LanguagerCtrl') // Загрузка страницы по клику на пункт меню
        	.on(_,'translateReady')
					.on(_,'loadTranslate')
							//
					.on(_,'changeTranslateLang')
					.on(_,'changeSystemLang')
					.on(_,'changeLang')
					.on(_,'editWord')
			
							//  Работа с пагинацией
					.on(_,'calcItemsCount')
					.on(_,'nextPage')
					.on(_,'prevPage')
					.on(_,'goPage')
							//
					.on(_,'saveTranslateWord')
					.on(_,'saveDefaultWord')
					.on(_,'editDefaultWord')
							//
					.on(_,'showModalTranslate')
							// Поиск
					.on(_,'inputSearchQuery')
					.on(_,'keyUpSearch')
					.on(_,'btnSearch');
    }
    //
    loadTranslate(translateData = {}){
			const _ = this;
			return  new Promise( async function (resolve) {
				if (translateData['from']){
					if(translateData['from'] == 'id'){
						resolve( await _.loadContTranslateFromId(translateData));
					}
				}
				resolve( await _.loadContTranslate(translateData))
			});
    }

    async loadContTranslateFromId(translateData= {}){
			const _ = this;
			let
				anim = translateData['anim']  ? translateData['anim'] : true,
				cont = translateData['cont']  ? translateData['cont'] :systemConts['main'],
				animationCont = translateData['animationCont']  ? translateData['animationCont'] :systemConts['main'];
			return new Promise( async function (resolve) {
				let words = [], animWords = [];
				words = [...cont.querySelectorAll(".word")];
				animWords = [...animationCont.querySelectorAll(".word")];
				let fwords = [];
				for(let i=0;i< words.length;i++){
						if (words[i].dataset.wordId){
							if(fwords.indexOf(words[i].dataset.wordId) > -1) continue;
							fwords.push(words[i].dataset.wordId);
						}
				}
				let
					translates = await _.model.getTranslatesFromId(fwords),
					outTranslates = [];
				for(let i = 0,len = words.length ;i< len;i++){
						let word = words[i];
						if (!word) continue;
						if (!word.dataset.wordId) continue;
						word.setAttribute('data-context-action','Menu:showContext');
						let trl = {
								'translate':'', word: word, 'default': word.dataset.word
						};
						for(let j=0; j < translates.length;j++){
								let translate = translates[j];
								if ( word.dataset.wordId == translate['id'] ){
										trl['translate'] = translate['translate'];
										trl['word'] = word;
										trl['default'] = translate['default'];
										outTranslates.push(trl);
										break;
								}
						}
						outTranslates.push(trl);
				}
				let translated = await _.view.translateWord({
						words: outTranslates,
						cont: words
				});
				if (anim){
						MainEventBus.trigger('Animation','textAnimation',{
								elems:  animWords
						});
				}
				resolve(translated);
			})
    }
    async loadContTranslate(translateData= {}){
			const _ = this;
			let
				anim = translateData['anim']  ? translateData['anim'] : false,
				cont = translateData['cont']  ? translateData['cont'] : systemConts['main'];
			return new Promise( async function (resolve) {
				let
					words = cont.querySelectorAll("[data-word]");
				
				for(let i=0;i< words.length;i++){
					let rawWord = words[i].getAttribute('data-word');
					if (rawWord){
						_.model.prepareWords(rawWord);
					}
				}
				let
					translates = await _.model.getTranslatesFromPreparedWords(),
					outTranslates = [];
				for(let i = 0,len = words.length; i < len ;i++){
					let
						word = words[i],
						wordAttr = word.getAttribute('data-word');
					if(!wordAttr) continue;
					let
						dataWord = wordAttr[0].toUpperCase() + wordAttr.slice(1,),
						dataLang = word.getAttribute('data-lang')
					if(dataLang == _.model.currentLang){
						continue;
					}
					word.setAttribute('data-lang',_.model.currentLang);
					word.setAttribute('data-context-action','Menu:showContext');
					
					let trl = {
						word: word,
						'default': dataWord
					};
					
			//		if(translates[dataWord]){
			/*		if(translates[dataWord]){
						trl['translate'] = translates[dataWord]['translate'];
						trl['word'] = word;
						trl['default'] = translates[dataWord]['default'];
					}
					*/
					if( !(translates == '""')  ){
						for(let i in translates){
							if('def' in translates[i]){
								if(translates[i]['def'] == dataWord){
									trl['translate'] = translates[i]['translate'];
									trl['word'] = word;
									trl['default'] = translates[i]['default'];
									delete translates[i];
									break;
								}
							}else{
								if(translates[i]['default'] == dataWord) {
									trl['translate'] = translates[i]['translate'];
									trl['word'] = word;
									trl['default'] = translates[i]['default'];
									delete translates[i];
									break;
								}
							}
						}
					}
					outTranslates.push(trl);
				}
			
				let translated = await _.view.translateWord({
					words: outTranslates,
					cont: words
				});
				if (anim){
					MainEventBus.trigger('Animation','textAnimation',{
						elems: words
					});
				}
				resolve(translated);
			})
    }
    
    async initLoadTranslate(page){
			this.loadContTranslate();
    }
    async pageLoadTranslate(cont){
       this.loadContTranslate(cont);
    }
    async getLangs(){
        const _ = this;
        let langData = {
            currentLang : _.model.currentLang
        }
        let response = await _.model.getLangs();
        if(response){
            langData['langs'] = response;
            await MainEventBus.trigger(_.componentName,'loadLangOptions',langData)
        }
    }
    showModalTranslate(clickObj){
        const _ = this;
        let item = clickObj['item'];
        MainEventBus.trigger('Modaler','showModal',{
            contentType: 'string',
            content: item.getAttribute('data-text')
        })
    }

    translateReady(cont){
			let elems = {
				elems: cont
			};
    }

    async editWord(clickObj){
        const _ = this;
        let btn = clickObj['item'];
        let
            wordId = btn.dataset.wordId,
            wordText = btn.dataset.wordText,
            wordType = btn.dataset.wordType;
        _.view.loadToEditForm({
            id: wordId,
            text: wordText,
            type: wordType,
        });

    }
    async editDefaultWord(item){
        const _ = this;
        let edit = true;
       _.saveDefaultWord(item,edit);
    }

    async saveTranslateWord(focusData){
        const _ = this;
        let //tr = item.parentNode.parentNode,
            item = focusData['item'],
            wordId = item.dataset.wordId,
            wordText = item.dataset.wordText;
        if(wordText === item.value) return;
        //if(!item.value) return;

        let langSelect = _.view.contentHead.querySelector('.lang-sel'),
            langValue = langSelect.options[langSelect.selectedIndex].value,
            wordObj = {};
        wordObj['lang'] = langValue;
        wordObj['translate'] = item.value;
        wordObj['wordId'] = wordId;

        let response = await _.model.saveTranslateWord(wordObj);

        if(response.status === 'success'){
            item.setAttribute('data-word-text',item.value);
            MainEventBus.trigger(_.componentName,'saveTranslateWordComplete',null)
        }else{
            MainEventBus.trigger(_.componentName,'saveTranslateWordError',null)
        }
    }
    async saveDefaultWord(item,type=''){
       const _ = this;
       let e = item['event'],
           form = item['item'];
       e.preventDefault();

       let fields = form.elements,
           wordObj = {};

       if(fields['value'].value){
           wordObj['value'] = fields['value'].value;
       }
       if(fields['value'].hasAttribute('data-id')){
           wordObj['wordId'] = fields['value'].getAttribute('data-id');
       }
        wordObj['type'] = fields['type'].options[fields['type'].selectedIndex].value;
       let response = {},
           outObj  = {
               value: wordObj['value']
           };
        if(!type){
            outObj['add'] = true;
            response = await  _.model.saveDefaultWord(wordObj);
        }else{
            response = await  _.model.editDefaultWord(wordObj);
        }
        if(response.status === 'success'){
            outObj['id'] = response['data']['id'];
            MainEventBus.trigger(_.componentName,'saveDefaultWordComplete',outObj);
        }else{
            MainEventBus.trigger(_.componentName,'saveDefaultWordError',outObj);
        }
    }
    changeLang(changeData){
			const _ = this;
			return new Promise(async function (resolve) {
				let langValue,
						item = changeData['item'];
				if (item.tagName == 'SELECT'){
					let
						select = changeData['item'],
						selectedOption  = select.options[select.options.selectedIndex];
					langValue = selectedOption.value;
				}else{
					item.parentNode.querySelectorAll('BUTTON').forEach( el=>el.classList.remove('active'));
					item.classList.add('active');
					langValue = item.value;
				}
				if(langValue === _.currentLang) return;
				let langObj = {
					lang: langValue,
					from: changeData['from'] ? changeData['from'] : false,
					cont: changeData['cont'] ? changeData['cont'] : systemConts['main'],
					animationCont: changeData['animationCont'] ? changeData['animationCont'] : systemConts['main']
				};
				if(changeData['anim'] == undefined){
						langObj['anim'] = true;
				}else{
						langObj['anim'] = false;
				}
				langObj['anim'] = false;
				MainEventBus.trigger(_.componentName,'chooseLang',langObj);
				resolve(true);
			});
    }



    async changeTranslateLang(changeData){
    	let item = changeData['item'];
			const _ = this; _.model.requestData['lang'] = item.value;
			//await _.view.mainContentTpl();
			await _.view.tableTpl();
			let langSelect = _.view.contentHead.querySelector('.lang-sel'),
			langValue = langSelect.options[langSelect.selectedIndex].value;
			await _.view.tableRowsTpl({
				page:1,
				lang: langValue
			});
    }
    async changeSystemLang(changeData){
    	const _ = this;
			let item = changeData['item'],
					langId = item.options[item.selectedIndex].getAttribute('lang-id');
			let response = await _.model.changeSystemLang(langId);
			location.reload();
		}


    async getDefaultWords(page=1){
			const _ = this;
			let searchInpt = _.view.contentHead.querySelector('.lang-search-value');
			if(searchInpt.value){
				let searched = await _.model.searchDefaultWord(searchInpt.value,page);
				await _.view.loadDefaultWords({
					words: searched,
					type: 'search',
					page: page
				});
			}else{
				let words = await _.model.getDefaultWords(page);
				await _.view.loadDefaultWords({
					words: words,
					type: 'main',
					page: page
				});
			}
    }

    async loadPageItems(page=1,template,searchMethod){
			const _ = this;
			let type = _.model.getCurrentType(),langValue;
			let langSelect = _.view.contentHead.querySelector('.lang-sel');
			if (langSelect)
					langValue = langSelect.options[langSelect.selectedIndex].value;
			if(type == 'main'){
				await _.view[template]({
					page:page,
					type: type,
					lang: langValue
				});
			}else{
				let items = await _.search(searchMethod,template,page);
			}
    }

}