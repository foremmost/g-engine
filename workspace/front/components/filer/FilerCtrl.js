import { Ctrl } from '../main/Ctrl.js';
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
export class FilerCtrl  extends Ctrl  {
    constructor(model,view){
			super(model,view);
			const _ = this;
			_.componentName = 'filer';
			MainEventBus
				.on(_,'showFile')
				.on(_,'deleteFile')
				.on(_,'goHome')
				.on(_,'goOnBread',_.goToBread.bind(_))
				.on(_,'openFolder')
				.on(_,'openFolderFromInput')
				.on(_,'createFolder')
				.on(_,'setFileNameToUpload')
				.on(_,'checkFile')
				.on(_,'confirmChangeFile',_.changeFile.bind(_),`${_.componentName}Ctrl`);
    }
    checkFile(changeData){
        const _ = this;
        let
            e = changeData['event'],
            item = changeData['item'];
        e.preventDefault();
        e.stopPropagation();
        let fileItem = item.parentNode.parentNode;
        if (!_.model.multiple){
            fileItem.parentNode.querySelectorAll('.filer-panel-item').forEach( (el)=>{
                if (el == fileItem) return false;
                el.classList.remove('active');
                el.querySelector('.filer-panel-item-action.check').checked = false;
            })
        }
        fileItem.classList.toggle('active');
        let hasConfirm = _.view.content.querySelector('.confirm-filer-btn');
        if (item.checked){
            if(!hasConfirm) {
            	if (_.view.content)	_.view.content.querySelector('.filer-panel-actions').append(_.view.confirmBtnTpl());
						}
        }else{
            if(hasConfirm) {
							if (_.view.content) _.view.content.querySelector('.confirm-filer-btn').remove();
						}
        }
    }
    changeMultipleFiles(clickData){
        const _ = this;
        let item = clickData['item'];
        let items = _.view.content.querySelectorAll('.filer-panel-item.active');
        let filesArr  = [];
        for (let item of items){
            let fileObj = {};
            let  thumbnailSrc =`${_.model.mainFolder}${item.textContent}`;
            if(_.model.folder){
                thumbnailSrc = `${_.model.mainFolder}${_.model.folder}/${item.textContent}`;
            }
            fileObj['src'] = thumbnailSrc;
            fileObj['name'] =   item.textContent;
            fileObj['folder'] =  _.model.folder;
            fileObj['fullPath'] =  `${_.model.folder}/${item.textContent}`;
            filesArr.push(fileObj);
        }
        MainEventBus.trigger(_.componentName,'changeFile', filesArr);
    }
    changeFile(clickData){
        const _ = this;
        if (_.model.multiple) return _.changeMultipleFiles(clickData);
        let item = clickData['item'];
					item = _.view.content.querySelector('.filer-panel-item.active');
					let thumbnailSrc =`${_.model.mainFolder}${item.textContent}`;
        if(_.model.folder){
            thumbnailSrc = `${_.model.mainFolder}${_.model.folder}/${item.textContent}`;
        }

        MainEventBus.trigger(_.componentName,'changeFile', {
            name :   item.textContent,
            folder :  _.model.folder,
            fullPath :  `${_.model.folder}/${item.textContent}`,
            thumbnailSrc :  thumbnailSrc,
            src :  thumbnailSrc
        });
        console.log(MainEventBus)
    }

    setFileNameToUpload(changeData){
			const _ = this;
			let
				item = changeData['item'],
				event = changeData['event'];
			event.stopPropagation();
			let fileName = '';
			if(item.value){
				let split = item.value.split("\\");
				fileName = split[split.length-1];
			}
			_.view.uploadFilename.textContent = fileName;
			console.log(fileName,item.files);
    }
    showFile(clickData){
        const _ = this;
        let item = clickData['item'],
            img = item.querySelector('svg'),
						srcPath = img.getAttribute('data-src');
        MainEventBus.trigger('Modaler','showModal',{
            content: _.view.el('IMG',{src:srcPath}),
            append: false,
            type: 'object'
        });
    }
    async goHome(clickData){
        const _ = this;
        _.model.clearFolderPath();
       // let page = await _.view.pageTpl();
        let page = await _.view.updatePageBody();
    }
    async goToBread(clickData){
        const  _ = this;
        let
            bread = clickData['item'],
            path  = [];
        while(!bread.classList.contains('home')){
            path.push(bread.dataset.bread);
            bread =bread.previousElementSibling;
        }
        _.model.clearFolderPath();
        path.reverse().forEach(function (folder) {
            _.model.folder =folder;
        });
      //  let page = await _.view.pageTpl();
        let page = await _.view.updatePageBody();
        _.view.appendBread(page);
    }
    async openFolderFromInput(keyPressData){
        const _ = this;
        console.log(keyPressData)
    }
    async openFolder(clickData){
        const _ = this;
        let folderCont = clickData['item'],
            folderName= folderCont.querySelector('.filer-panel-item-title').textContent;
         _.model.folder = folderName;
         let files = await _.model.getFiles(),
             page = await _.view.updatePageBody();

    }
    async createFolder(clickData){
        const _ = this;
        clickData['event'].stopPropagation();
        let folderName = prompt(
            'Введите название папки'
        );
        if (folderName){
            let response = await _.model.createFolder(folderName);
            await _.view.fileUploaded(null,null,{name:folderName});
        }
    }
    async deleteFile(clickData){
        const _ = this;
        let elem = clickData['item'],
            name = elem.dataset.fileName;
	    let answer = await MainEventBus.trigger('Modaler','showConfirm',{
		    text: 'Удалить?'
	    });
      if (answer){
          await _.model.deleteFile(name);
          MainEventBus.trigger(_.componentName,'updatePanel');
      }
    }

}