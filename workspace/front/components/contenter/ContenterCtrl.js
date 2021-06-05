import { Ctrl } from '../main/Ctrl.js';
import { MainEventBus } from "../../libs/MainEventBus.lib.js";
import { Functions } from "../../libs/Functions.lib.js";
export class ContenterCtrl  extends Ctrl  {
  constructor(model,view){
    super(model,view);
    const _ = this;

    _.componentName = 'contenter';
	  _.busProp = 'ContenterCtrl';
    //  Работа с пагинацией
    MainEventBus
      .on(_,'calcItemsCount')
      .on(_,'nextPage')
	    .on(_,'prevPage')
	    .on(_,'goPage')
	
	        // Поиск
	    .on(_,'inputSearchQuery')
	    .on(_,'keyUpSearch')
	    .on(_,'btnSearch')
//	    .on(_,'addThumbnail')
      .on('filer','changeFile',_.changeThumbnail.bind(_),'ContenterCtrl')
	    .on(_,'deleteMainThumb')
	    .on(_,'fillForm')
	    .on(_,'translateForm')
	    .on(_,'save')
	    .on(_,'delete')
  }
	async translateForm({item,event}){
  	const _ = this;
  	let
			itemId = item.getAttribute('data-item-id'),
			systemLang = await MainEventBus.trigger('languager','getSystemLang'),
			langId = 	item.getAttribute('data-lang-id');
		let currentService = await _.model.getOneItem({
			itemId: itemId
		},'services');
		let translates;
		if(!currentService){
			MainEventBus.trigger('Log','showLog',{
				status: 'warning',
				title: "Warning!",
				text: "Main translate not found",
			})
			return;
		}
		item.parentNode.querySelectorAll('.btn').forEach( el=>el.classList.remove('active'))
		let form = _.view.contentBody.querySelector('.page-form');
		form.reset();
		if (itemId) {
			_.view.commonId.value = itemId;
			_.view.itemLang.value = langId;
			if(langId == systemLang['id']) {
				_.view.commonId.value = null;
				translates = currentService;
				if(translates && translates['id']) form.setAttribute('data-save-type', 'edit');
			} else {
				if(!currentService){
				}else{
					if(currentService['translates']) {
						for(let i = 0; i < currentService['translates'].length; i++) {
							if(currentService['translates'][i]['lang_id'] == langId) {
								translates = currentService['translates'][i];
								_.view.itemId.value = translates['id'];
								form.setAttribute('data-save-type', 'edit');
								break
							}
						}
					}
				}
			}
		}
		if(translates){
			await _.fillMainFormProps(form.elements,translates);
			await MainEventBus.trigger('tynt','setContent',translates['description']);
			if(translates['image']){
				MainEventBus.trigger('filer','changeFile',[{
					fullPath: translates['image'],
					src: '/uploads/'+translates['image'],
					name: translates['image']
				}]);
			}
		} else{
			form.setAttribute('data-save-type','save');
		}
		item.classList.toggle('active');
	}
	async fillMainFormProps(elems,props){
  	const _ = this;
		for (let prop in props){
			if (elems.hasOwnProperty(prop)) {
				if(prop == 'common_id'){
					elems['common_id'].value = props['common_id'];
					//_.view.log(props['common_id']);
				}else{
					elems[prop].value = props[prop];
				}
				
			}
		}
	}
	async fillForm({itemId,btn}){
  	const _ = this;
  	Functions.showLoader(_.view.content);
		let currentService = await _.model.getOneItem({
			itemId: itemId
		},'services');
		await MainEventBus.trigger(_.componentName,'showForm',{
			item:btn,
			id: currentService['id'],
			langId: currentService['lang_id']
		});
		
		let form = _.view.contentBody.querySelector('.page-form');
		form.setAttribute('data-save-type','edit');
		await _.fillMainFormProps(form.elements,currentService);
		await MainEventBus.trigger('tynt','setContent',currentService['description']);
		MainEventBus.trigger('filer','changeFile',[
			{
				fullPath: currentService['image'],
				src: '/uploads/'+currentService['image'],
				name: currentService['image']
			}
		]);
		//console.log(MainEventBus);
		Functions.hideLoader(_.view.content);
	}
	changeThumbnail(fileData){
		const _ = this;
  	let file = fileData[0],
	      src = file['src'];
		_.view.mainImage.src = src;
		_.view.mainImage.setAttribute('data-src',file['fullPath']);
	}
	deleteMainThumb(){
  	const _ = this;
  	_.view.mainImage.removeAttribute('src');
  	_.view.mainImage.removeAttribute('data-src');
		
		_.view.show(_.view.addMainThumbBtn);
		_.view.hide(_.view.deleteMainThumbBtn);
	}
	async save(){
  	const _ = this;
  	let form = _.view.contentBody.querySelector('.page-form');
  	let
	    formData = _.createFormData(form),
      body = await MainEventBus.trigger('tynt','getContent');
  	formData['image'] = _.view.contentBody.querySelector('.page-thumb-main').dataset.src;
  	formData['description'] = body;
  	let
	    type = _.view.contentHead.dataset.type,
	    title,text,response;
		formData['type'] = type;
    if( form.hasAttribute('data-save-type') && form.dataset.saveType == 'edit'){
		  response = await _.model.updateService(formData);
		  title = 'Content updated';
			if(response['data']['commonId']){
				_.view.contentBody.querySelectorAll('.lang-btn').forEach( (el)=> el.setAttribute('data-item-id',response['data']['commonId']))
			}else{
				_.view.contentBody.querySelectorAll('.lang-btn').forEach( (el)=> el.setAttribute('data-item-id',response['data']['serviceId']))
			}
			_.view.itemId.value = response['data']['serviceId'];
	  }else{
		  response = await _.model.saveService(formData);
			if(response['data']['commonId']){
				_.view.contentBody.querySelectorAll('.lang-btn').forEach( (el)=> el.setAttribute('data-item-id',response['data']['commonId']))
			}else{
				_.view.contentBody.querySelectorAll('.lang-btn').forEach( (el)=> el.setAttribute('data-item-id',response['data']['serviceId']))
			}
			_.view.itemId.value = response['data']['serviceId'];
		  title = 'Content saved';
	  }
  	if(response['status'] == 'success'){
			_.model.getTableItems({
				type: type,
				page: _.currentPage
			});
			MainEventBus.trigger('Log','showLog',{
				'status': 'success',
				'title':title,
				'save': true
			})
	  }
  	
		form.setAttribute('data-save-type','edit');
	}
	async delete(clickData){
  	const _ = this;
  	if (await MainEventBus.trigger('Modaler','showConfirm',{
			text: 'Удалить?'
		})) {
			let
				item = clickData['item'],
				id = item.dataset.id,
				response = await _.model.delete({id});
				if(response['status'] == 'success') {
					MainEventBus.trigger('Log', 'showLog', {
						'status': 'success',
						'title': 'Item deleted',
						'save': true
					});
					item.closest('tr').remove();
				} else {
					MainEventBus.trigger('Log', 'showLog', {
						'status': 'error',
						'title': 'Item delete failed',
						'save': true
					});
				}
		}
	}
}