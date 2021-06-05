import { Model } from '../main/Model.js';
export class ContenterModel extends Model {
	constructor(){
		super();
		const _ = this;
		_.componentName = 'contenter';
		_.currentPage = 1;
	}
	async saveService(data){
		const _ = this;
		return await _.handler({
			type: 'class',
			method: 'saveService',
			data: data,
		},'JSON');
	}
	async updateService(data){
		const _ = this;
		return await _.handler({
			type: 'class',
			method: 'updateService',
			data: data,
		},'JSON');
	}
	async getTableItems(itemsData){
		const _ = this;
		let items =  await _.handler({
			type: 'class',
			method: 'getAll',
			data: itemsData,
		},'JSON');
		_.services = items;
		return items;
	}
	async delete(data){
		const _ = this;
		return await _.handler({
			type: 'class',
			method: 'delete',
			data: data,
		},'JSON');
	}
}