import { MainEventBus } from "./MainEventBus.lib.js";
import { Lib } from "./Lib.js";
class _Tynt extends Lib{
	constructor(selector){
		super();
		const _ = this;
		_.componentName = 'tynt';
		_.cont = document.querySelector(selector);
		_.busProp = 'tynt'
		MainEventBus
			.on(_,'setStyle')
			.on(_,'getContent')
			.on(_,'setContent')
	}
	tyntTpl(tyntData){
		const _ = this;
		return _.el('DIV',{
			class:'page-tynt'
		});
	}
	getContent(){
		const _ = this;
		return _.content.getContent({format:'html'});
	}
	async setContent(content){
		const _ = this;
		return new Promise(function(resolve){
			resolve(_.content.setContent(content));
		});
	}
	setStyle(clickAction){
		const _ = this;
		let btn = clickAction['item'],
				action = btn.dataset.action;
		btn.classList.toggle('active');
		let
			tyntBody = _.tyntFrame.contentWindow.document.querySelector('body'),
			tyntHtml = tyntBody.innerHTML,
			selectedText =  _.tyntFrame.contentWindow.document.getSelection().toString();
		switch(action){
			case 'bold':{
				let strong = `<strong>${selectedText}</strong>`;
				tyntBody.innerHTML = tyntHtml.replace(new RegExp(selectedText,'m'), strong);
			} break;
			case 'italic':{
				let em = `<em>${selectedText}</em>`;
				tyntBody.innerHTML = tyntHtml.replace(new RegExp(selectedText,'m'), em);
			} break;
			default: {};
		}
	}
	initTiny(){
		const _ = this;
		return new Promise(function(resolve){
			let tinymce = _.el('SCRIPT', {
				'src': "https://cdn.tiny.cloud/1/w06bwxeowxd9fws038luv7cdl7azhf624ucvv93dbczo1y7e/tinymce/5/tinymce.min.js",
				'referrerpolicy':"origin"
			});
			document.querySelector('head').appendChild(tinymce);
			
			tinymce.onload = function(e){
				resolve(e)
			}
		})
	}
	async init(){
		const _ = this;
		return new Promise(function(resolve){
		//if(!_.content) {
			//_.cont.append(_.tyntTpl());
		//	tinymce.remove();
			tinymce.init({
				selector: '.page-tynt-body',
				width: '97%',
				height: 500,
				menubar: false,
				plugins: 'table image media',
				language: 'ru',
				language_url: '/workspace/front/libs/libsData/langs/ru.js',
				//	content_css: '/front.css',
				toolbar: `
					table | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify |
					bullist numlist outdent indent | link | print preview media fullpage | forecolor backcolor emoticons | help | filer | image
				`,
				setup: function(e) {
					e.on('init', function(args) {
						_.content = tinymce.activeEditor;
						_.tiny = tinymce;
						resolve(_.content)
					});
				/*	e.ui.registry.addButton('filer', {
						text: 'filer',
						icon : 'gallery',
						onAction: function(){
							MainEventBus.trigger('filer','showOnModal',e)
						}
					})*/
					
				}
			});
		});
	}
}

export const Tynt = new _Tynt('.page-tynt');