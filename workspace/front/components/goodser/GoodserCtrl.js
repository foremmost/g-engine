import { Ctrl } from '../main/Ctrl.js';
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";
import {TweenMax} from "../../libs/GreenSock.lib.js";
//import {Tynt} from "../../libs/Tynt.lib.js";
export class GoodserCtrl	extends Ctrl	{
	constructor(model,view){
		super(model,view);
		const _ = this;

		_.componentName = 'goodser';

		//	Работа с пагинацией
		_.busProp = `${_.componentName}Ctrl`;
		MainEventBus
			.on(_,'importGoods')
			.on(_,'exportGoods')
			.on(_,'copyGoods')
			.on(_,'showGoods')
			.on(_,'calcItemsCount')
			.on(_,'nextPage')
			.on(_,'prevPage')
			.on(_,'goPage')
		// Поиск
			.on(_,'inputSearchQuery')
			.on(_,'keyUpSearch')
			.on(_,'btnSearch')
		//
			.on(_,'addProductThumbnail')
			.on(_,'changeMainThumb')
			.on(_,'clearForm')
			.on(_,'deleteImage')
			.on(_,'deleteMainImage')
			.on(_,'save')
			.on(_,'deleteGoods')
			.on(_,'fillForm')
			.on('categorier','changeCat',_.changeCat.bind(_))
			.on('filer','changeFile',_.changeThumbnail.bind(_))
		//
	}
	async deleteGoods(clickData){
		const _ = this;
		let
			btn = clickData['item'],
			goodsId = Number(btn.dataset.goodsId),
			answer = await MainEventBus.trigger('Modaler','showConfirm',{
				text: 'Удалить?'
		});
		if (answer){
			let response = await _.model.deleteGoods({
				'id': goodsId
			});
			if(response['status'] === 'success'){
				MainEventBus.trigger('Log','showLog',{
					'status': 'success',
					'title':'Goods deleted',
					'text': `Deleted id: ${goodsId}`,
					'save': true
				});
				btn.parentNode.parentNode.parentNode.remove();
			}
		}
	}
	clearForm(){
				const _ = this;
				_.model.mainImageChanged = false;
		}
	changeCat(catData){
		const _ = this;
		_.model.c_id = catData['id'];
	}
	importGoods(clickData){
		MainEventBus.inDev();
	}
	exportGoods(clickData){MainEventBus.inDev();
	}
	copyGoods(clickData){
		const _ = this;
		
	}
	showGoods(clickData){
		MainEventBus.inDev();
	}
	async fillForm(itemId){
		const _ = this;
		let formData = await _.model.getGoodsFull(itemId),
		cat = await	MainEventBus.trigger('categorier','getCategory',formData['c_id']);
		await _.view.changeCat(cat);
		let elems =systemConts['content'].querySelector('.goods-form').elements;
		_.fillMainFormProps(elems,formData);
		_.fillCatFormProps(elems,formData['props']);
		await MainEventBus.trigger('tynt','setContent',formData['tables']);
		await _.changeThumbnail([{
			src: formData['image']
		}]);
		await MainEventBus.trigger('languager','loadTranslate', {
			cont: _.view._content
		});
		if(!formData['images']) return
		for(let img of formData['images']){
			await _.changeThumbnail([{
				src: img
			}]);
		}
	}
	async fillCatFormProps(elems,props){
		for (let prop of props){
			let name = 'prop-'+prop['prop_id'];
			if (elems[name]){
				elems[name].value = prop['prop_value'];
			}
		}
	}
	async fillMainFormProps(elems,props){
		for (let prop in props){
		
			if (elems.hasOwnProperty(prop)){
				if(elems[prop].type == 'checkbox'){
					elems[prop].checked = props[prop];
				}else{
					elems[prop].value = props[prop];
				}
			}
		}
	}

	async save(clickData){
		const _ = this;
		let
			form = _.view._content.querySelector('.goods-form'),
			formData = _.createFormData(form),
			saveType = form.getAttribute('save-type');
		if(formData['status'] == 'fail'){
			console.log(formData['errors']);
			for( let error of formData['errors']){
				error['element'].classList.add('errorField');
				MainEventBus.trigger('Log','showLog',{
					'status': 'error',
					'title':'Goods saved error',
					'text': error['text'],
					'save': true
				})
			}
			return;
		}
		let props = [];
		for (let prop in formData){
			if ((prop.indexOf('prop-') < 0)) continue;
			let property = {};
			property[prop.slice(prop.indexOf('prop-')+5)] = formData[prop];
			props.push(property);
			delete	formData[prop];
		}
		formData['props'] = props;
		formData['image'] = _.model.image;
		formData['images'] = _.model.images;
		let tables = await MainEventBus.trigger('tynt','getContent');
		formData['tables'] = tables;
		let response;
		if(saveType == 'save'){
			response = await _.model.saveGoods(formData);
		}else{
			response = await _.model.updateGoods(formData);
		}
		if (_.checkResponse(response)){
			MainEventBus.trigger('Log','showLog',{
				'status': 'success',
				'title':'Goods saved',
				'save': true
			})
		}else{
			MainEventBus.trigger('Log','showLog',{
				'status': 'error',
				'title':'Goods saved error',
				'text': response['errorText'],
				'save': true
			})
		}
		
		_.model.image = '';
		_.model.images = [];
		_.view.backToTable(clickData);
	}
	deleteMainImage(clickData){
		const _ = this;
		let btn = clickData['item'],
			imageCont = btn.parentNode;
		imageCont.remove();
		_.model.image = '';
		let pageImages = _.view.contentBody.querySelector('.goods-thumb-list-item');
		if (pageImages){
			pageImages.querySelector('button').setAttribute('data-click-action',`${_.componentName}:deleteMainImage`);
			_.model.image = pageImages.querySelector('img').dataset.src;
			_.view._content.querySelector('.goods-thumb-body').append(pageImages);
		}
	}
	deleteImage(clickData){
		const _ = this;
		let btn = clickData['item'],
			thumb = btn.previousElementSibling,
				imageCont = btn.parentNode;
			TweenMax.to(imageCont,1,{
				rotation: -360,
				opacity: 0,
				scale: 0,
				ease: 'Back.easeInOut',
				onComplete: function(){
					imageCont.remove();
					if(thumb){
						_.model.deleteImage(thumb.dataset.src);
					}
				}
			});
			
	}
	async changeMainThumb(clickData){
		const _ = this;
		let
			thumb = clickData['item'],
			thumbImg	= thumb.querySelector('.goods-t'),
			mainThumb = _.view.contentBody.querySelector('.goods-thumb-body .goods-t');
		_.model.image = thumbImg.dataset.src;
		_.model.images.push(mainThumb.src);
		if (mainThumb){
			mainThumb.parentNode.append(thumbImg);
			thumb.append(mainThumb);
		}else{
			_.view.contentBody.querySelector('.goods-thumb-body').append(
				await _.view.thumbnailTpl({
					src: thumbImg.dataset.src,
					'data-src': thumbImg.src,
				})
			);
			thumb.remove();
		}
	}
	async addProductThumbnail(){
		const _ = this;
		let content = await MainEventBus.trigger("filer",'showOnModal',true);
	/*	MainEventBus.trigger("Modaler",'showModal',{
			'min-width': '90%',
			content: content
		})*/
	}
	compareThumb(src){
		const _ = this;
		let allThumbs = _.view._content.querySelectorAll('.goods-t');
		for(let thumb of allThumbs){
			if(thumb.dataset.src === src) return true;
		}
		return false;
	}
	async changeThumbnail(fileData){
		const _ = this;
		return new Promise(async function(resolve){
		let thumbBtn =	_.view._content.querySelector('.goods-thumb-btn');
		if(_.compareThumb(fileData[0]['src'])){
			resolve(MainEventBus.trigger('Modaler','closeLastModal'));
		}
		let thumbBody = _.view._content.querySelector('.goods-thumb-body');
		if (!_.model.mainImageChanged){
			thumbBody.append(
				await _.view.thumbnailTpl(fileData[0])
			);
			_.model.image = fileData[0]['src'];
			_.model.mainImageChanged = true;
		}
		for (let file of fileData){
			let compare = _.compareThumb(file['src']);
			if(compare) continue;
			_.model.images.push(file['src']);
			let filesList = _.view._content.querySelector('.goods-thumb-list');
			filesList.append(await _.view.thumbListItem(file));
		}
		_.view._content.querySelector('.goods-thumb-list').append(thumbBtn);
		MainEventBus.trigger('Modaler','closeLastModal');
			resolve(_.model.mainImageChanged);
		});
	}
	async calcItemsCount(calcData = {type:'main'}){
		const _ = this;
		return new Promise( async function (resolve) {
			calcData['type'] = calcData['type'] ? calcData['type'] : 'main';
			let cnt;
			cnt = await _.model.getItemsCnt(calcData);
			resolve(parseInt(cnt));
		})
	}
}