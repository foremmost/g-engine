import { Module } from "../main/Module.js";
import { CategorierModel } from "./CategorierModel.js";
import { CategorierView } from "./CategorierView.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
//import { CategorierCtrl } from "./CategorierCtrl.js";

export class Categorier extends Module {
	constructor(page){
		super(null,null,null);
		const _ = this;
		_.componentName = 'categorier';
		MainEventBus
			.on(_,'getCategory')
			.on(_,'getCatList')
			.on(_,'getCatPropLists')
			.on(_,'getCurrentPropList')
			.on(_,'getCurrentProperties');
		if (!page)  _.init(page);
	}
	async init(page){
			const _ = this;
			let
					model = new CategorierModel(),
					view = new CategorierView(model);
			_.view = view;
			_.model = model;
			let rawCtrl;
			if (page == 'categories'){
					rawCtrl = await _.includePart('CategorierCtrl');
			}else{
					rawCtrl = await _.includePart('CategorierModalCtrl');
			}
			_.ctrl = new rawCtrl(model, view);
			return await _.view.render(page);
	}
	getCategory(id){
		const _ = this;
		return _.model.getCategory({
				catId: id
		})
	}
	getCatList(){
		const _ = this;
		return _.view.fillCategoriesListOutSide();
	}
	getCatPropLists(){
			const _ = this;
			return  _.model.getPropertiesLists();
	}
	getCurrentProperties(catId){
			const _ = this;
			return  _.model.getCurrentProperties(catId);
	}
	async getCurrentPropList(listId){
			const _=  this;
			return _.model.getCurrentPropList(listId);
	}
}