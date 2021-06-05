import { View } from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {Functions} from "../../libs/Functions.lib.js";
const
	FULL = 100;
export class FilerView extends View {
	constructor(model) {
		super(model);
		const _ = this;
		_.modulePage = 'files';
		_.componentName = 'filer';
		_.type = 'page';
		MainEventBus.add(_.componentName,'updatePanel',_.updatePageBody.bind(_));
		MainEventBus.add(_.componentName,'dragEnter',_.dragEnter.bind(_));
		MainEventBus.add(_.componentName,'dragStart',_.dragStart.bind(_));
		MainEventBus.add(_.componentName,'dragOver',_.dragOver.bind(_));
		MainEventBus.add(_.componentName,'dragLeave',_.dragLeave.bind(_));
		MainEventBus.add(_.componentName,'dropFile',_.dropFile.bind(_));
		_.actions = {
			 'page':{
				'showFile': `${_.componentName}:showFile`
			 },
			 'modal':{
				'showFile': `${_.componentName}:showModalFile`
			 }
		 };

	}
	pageHeadTpl(pageData = {}){
		const _ =  this;
		return _.el('temp',{
	 	childes:[
			 _.el('H1',{class:'page-title','data-word':'Files'}),
			 _.el('DIV',{
				 class:'filer-panel-actions',
				 childes:[
					 _.el('BUTTON',{
						 class:'btn filer-action',
						 'data-click-action': `${_.componentName}:createFolder`,
						 childes:[
							 _.el("IMG",{
								 src:'/workspace/img/filer/newfolder.svg'
							 })
						 ]
					 }),
					 _.el('BUTTON',{
						 class: 'btn filer-action',
						 'data-click-action': `${_.componentName}:updatePanel`,
						 childes:[
							 _.el("IMG",{
								 src:'/workspace/img/filer/update.svg'
							 })
						 ]
					 }),
					 _.el('LABEL',{
						 class: 'btn filer-action',
						 for:'fileUpload',
						
						 childes:[
							 _.el("IMG",{
								 src:'/workspace/img/filer/upload.svg'
							 }),
							 _.el("SPAN",{
							 	prop:'uploadFilename',
								class:'upload-filename'
							 }),
							 _.el('INPUT',{
								 type: 'file',
								 id: 'fileUpload',
								 'data-change-action': `${_.componentName}:setFileNameToUpload`,
								 multiple: true
							 })
						 ]
					 })
				 ]
			 })
		 ]
	 })
	}
	async pageTpl() {
			const _ = this;
			return new Promise( async function (resolve) {
				_.clearContent();
				let pageHeadTpl = _.getTpl('pageHeadTpl');
			Functions.showLoader(_.contentBody);
			
			_.contentHead.append(pageHeadTpl);
			_.contentBody.append(await _.bodyTpl());
			Functions.hideLoader(_.contentBody);
			resolve(_._content);
			})
		}
	async pageModalTpl() {
		const _ = this;
		return new Promise( async function (resolve) {
			_.content =   _._content.cloneNode(true);
			_.pageHead = _.content.querySelector('.page-head');
			_.pageBody = _.content.querySelector('.page-body');
			_.clearCont(_.pageHead);
			_.clearCont(_.pageBody);
			let pageHeadTpl = _.getTpl('pageHeadTpl',{save:false});
			_.pageHead.append(pageHeadTpl);
			_.pageBody.append(await _.bodyTpl());
			MainEventBus.trigger('languager','loadTranslate',{'cont':_.content});
			resolve(_.content);
		})
	}
	confirmBtnTpl(){
	 const _ = this;
	 let tpl =  {
		 el: _.createEl('BUTTON','page-btn confirm-filer-btn',{'data-click-action':`${_.componentName}:confirmChangeFile`}),
		 childes:[
		  {
			  el: _.createEl('IMG',null,{src:'/workspace/img/plus.svg'})
		  }
		 ]
	 };
	 return _.createTpl(tpl);
	}

	async updatePageBody(){
	 const _= this;
	 let content;
	 if(_.content) content = _.content;
	 else content = _._content;
	 let filerPanels = content.querySelector('.page-body').querySelector('.filer-panels');
	 _.clearCont(filerPanels);
		Functions.showLoader(_.contentBody);
	 let panel  = await _.panelTpl();
	 filerPanels.append(panel);
		
	Functions.hideLoader(_.contentBody);
	 return filerPanels;
	}
	async fileTpl(fileData){
	 const _ = this;
	 return new Promise(async function (resolve) {
		 let
		  itemChildes = [],
		  itemsParams = {};
		 if (!fileData.name) resolve({});
		 if (fileData['type']){
		 switch (fileData['type'].toLowerCase()) {
		  case 'png':
		  case 'jpeg':
		  case 'svg':
		  case 'jpg': {
				itemChildes.push(
				_.el('DIV',{
					class: 'filer-panel-item-img',
					childes:[
					_.el('SVG',{
						'data-src': fileData['pathName'],
						class:'icon',
						html:`<use xlink:href="#${fileData['type']}"></use>`
						//src: `img/filer/${fileData['type']}.svg`
					})]
				}));
				itemsParams['data-click-action']= _.actions[_.type]['showFile'];
			} break;
		  case 'dir': {
			  itemChildes.push(
			 _.el('DIV',{
			 	class: 'filer-panel-item-img',
				 childes:[
					 _.el('IMG',  {src: 'img/filer/folder.svg'})
				 ]
			 }));
			  itemsParams['data-click-action']=  `${_.componentName}:openFolder`;
		  }break;
		  case 'docx': {
			  itemChildes.push(
			 _.el('DIV',{
			   class: 'filer-panel-item-img',
			   childes:[
				 _.el('IMG',{src: 'img/filer/word.svg'})
			   ]
			 }));
		  }break;
		  case 'pdf': {
			  itemChildes.push(
			 _.el('DIV',{
			   class: 'filer-panel-item-img',
			   childes:[
				 _.el('IMG',{src: 'img/filer/pdf.svg'})
			   ]
			 }));
		  }break;
		 }
		 }
		 itemChildes.push(
		_.el('SPAN',{
		  class: 'filer-panel-item-title',
						 text: fileData['name'],
					 })
		 );
		 itemChildes.push(
		_.el('DIV',{
			class: 'filer-panel-item-actions',
			childes:[
			  _.el('BUTTON',{
			  	class:'filer-panel-item-action delete',
				  'data-file-name': fileData['name'],
				  'data-click-action':`${_.componentName}:deleteFile`
			  }),
			  _.el('INPUT',{
			  	class: 'filer-panel-item-action check',
				  type: "checkbox",
				  'data-file-name': fileData['name'],
				  'data-change-action':`${_.componentName}:checkFile`
			  })
			]
		})
		 );
		 let tpl = _.el('DIV',{
			 ...itemsParams,
			 class: 'filer-panel-item',
			 childes: itemChildes
		 });
	   resolve(tpl);
	 })
	}

	async dragStart(dragEvent){
	 dragEvent['event'].preventDefault();
	}
	async dragOver(dragEvent){
	 dragEvent['event'].preventDefault();
	}
	async dragEnter(dragEvent){
	 const _ = this;
	//	dragEvent['event'].stopPropagation();
	 let elem = dragEvent['item'];
	 if (elem.classList.contains('filer-panel-body')){
		 elem.style.border = '1px dashed #404040';
	 }
	}
	async dragLeave(dragEvent){
	 const _ = this;
	 let elem = dragEvent['item'];
	 if (elem.classList.contains('filer-panel-body')){
		 elem.style.border = '1px dashed transparent';
	 }
	}
	fillProgressBarColor(elem,percent){
	 const _ = this;
	 //_.fillProgressBarColor(loadedElem.querySelector('b'),percent);
	 elem.style.width = percent + '%' ;
	 if (percent <= 40){
		 elem.style.backgroundColor= 'red';
	 }else if (percent <= 70){
		 elem.style.backgroundColor= 'yellow';
	 }else if (percent == FULL){
		 elem.style.backgroundColor= 'forestgreen';
	 }
	}
	async fileUploaded(event,elem,file){
	 const _ = this;
	 let currentFile = await _.model.getFile('',file['name']);
	 if (currentFile['name']) {
	 	if (_.content)	_.content.querySelector('.filer-panel-body').append(await _.fileTpl(currentFile));
	 	else 	_._content.querySelector('.filer-panel-body').append(await _.fileTpl(currentFile));
	 }

	 MainEventBus.trigger(_.componentName,'updatePanel');
	 //   if(elem) elem.remove();
	}
	async dropFile(dragEvent){
	 const _ = this;
	 let e =  dragEvent['event'];
	 e.preventDefault();
	 e.stopPropagation();
	 let files = e.dataTransfer.files;
	 let elem = dragEvent['item'];
	 let itemChildes = [];
	 let tpl = {
		 el:  _.createEl('DIV','filer-panel-item'),
		 childes: itemChildes
	 };
	 itemChildes.push( {
		el: _.createEl('EM','filer-panel-item-progress' ),
		childes:[{
			el: _.createEl('B')
		}]
	 });
	 let loadedElem  = _.createTpl(tpl);
	 let allArr = [];
	 for (let i=0;i <files.length;i++){
		 let file =   _.model.fileUpload({
		  path: _.model.folder,
		  file: files[i],
		  loadHandler: function (event) {
		  	if(_.content)  _.content.querySelector('.filer-panel-body').append(loadedElem);
		  	else  _._content.querySelector('.filer-panel-body').append(loadedElem);
			  let  percent = (event.loaded / event.total ) * 100;
			  _.fillProgressBarColor(loadedElem.querySelector('b'),percent);
		  },
		  loadedHandler: function (event) {
			  _.fileUploaded(event, loadedElem,files[i]);
		  },
		 });
		 allArr.push(file);
	 }
	 Promise.all(allArr);
	 if (elem.classList.contains('filer-panel-body')){
		 elem.style.border = '1px dashed transparent';
	 }
	}
	appendBread(page){
	 const _ = this;
	 let folders = _.model.folder.split('/');
	 folders.forEach(function (folder) {
		 let bread = _.createEl('BUTTON','filer-panel-path-bread',{
		  'data-bread':folder,
		  'data-click-action':`${_.componentName}:goOnBread`,
		  text: folder
		 });
		 page.querySelector('.filer-panel-path').append(bread);
	 })

	}
	async panelTpl(){
	 const _ = this;
	 return new Promise(async function (resolve) {
		 let breadTpl = [],
		  breadsArr = _.model.folder.split('/');
		 _.clearCont('.filer-panel-path');
		 breadTpl.push(
		  _.el('BUTTON',{
		  	class: 'filer-panel-path-bread home',
			  'data-click-action':`${_.componentName}:goHome`
		 }));
		 if (_.model.folder){
		  breadsArr.forEach(  (el)=>{
			  breadTpl.push(
			 _.el('BUTTON',{
			 	class: 'filer-panel-path-bread',
				 'data-bread': el,
				 'data-click-action':`${_.componentName}:goOnBread`,
				 text: el
			 })
			  );
		  });
		 }
		 let files  = await _.model.getFiles(),
		  itemsTpl = [];
		 for (let i = 0; i < files.length;i++){
		  let file = files[i];
		  itemsTpl.push(await _.fileTpl(file));
		 }
		 resolve(_.el('DIV',{
		 	class: 'filer-panel',
			 childes:[
			_.el('DIV',{
				class: 'filer-panel-head',
				childes:[
				  _.el('DIV',{
				  	class: 'filer-panel-path',
					  'data-click-action':`${_.componentName}:showPath`,
					  'data-keypress-action':`${_.componentName}:openFolderFromInput`,
					  childes: breadTpl
				  })
				]
			}),
			_.el('DIV',{
				class:'filer-panel-body',
				'data-drag-start-action': `${_.componentName}:dragStart`,
				'data-drag-over-action': `${_.componentName}:dragOver`,
				'data-drag-enter-action': `${_.componentName}:dragEnter`,
				'data-drag-leave-action': `${_.componentName}:dragLeave`,
				'data-drop-action': `${_.componentName}:dropFile`,
				childes:itemsTpl
			})
			 ]
		 }));
		 
	 })
	}
	async bodyTpl(){
	 const _ = this;
	 return _.el('DIV',{
		class: 'filer-panels',
		childes:[
			await _.panelTpl()	]
	 });
	}
	render(page,multiple) {
	 const _ = this;
	 return new Promise(async function (resolve) {
		 
		 if (page === _.modulePage) {
		  let content = await _.pageTpl();
		  
		  resolve(content);
		  return ;
		 }
		 if ( (page === 'modal')){
		  _.type = 'modal';
		  _.model.multiple = multiple;
		  resolve(await _.pageModalTpl(multiple));
			 
			 return ;
		 }
		 resolve(true);
	 })
	}
}