import {Model} from '../main/Model.js';

export class RightsModel extends Model {
    constructor(){
        super();
        const _ = this;
        _.componentName = 'rights';
    }
    async getModules(){
        const _ = this;
        return await _.handler({
            method: 'getModules',
            type: 'class',
            data: null
        }, 'JSON');
    }
    async getModulesToAvail(data){
        const _ = this;
        let page = data['pageId'];
        return await _.handler({
            method: 'getModulesToAvail',
            type: 'class',
            data: {
                'pageId': page
            }
        }, 'JSON');
    }
    async getActions(pagesData){
        const _ = this;
        return await _.handler({
            method: 'getActions',
            type: 'class',
            data: {
                'groupId': pagesData['groupId']
            }
        }, 'JSON');
    }
    async getPages(){
			const _ = this;
			let response =  await _.handler({
					method: 'getPages',
					type: 'class',
					data: null
			}, 'JSON');
			return response['data'];
    }
    async getGroups(){
			const _ = this;
			let response = await _.handler({
				method: 'getGroups',
				type: 'class',
				data: null
			}, 'JSON');
			return response['data'];
    }
    async changeActionAvail(actionData){
        const _ = this;
        return _.handler({
            method: 'changeActionAvail',
            type: 'class',
            data: actionData
        }, 'JSON')
    }
    async changeModuleOnPage(actionData){
        const _ = this;
        return _.handler({
            method: 'changeModuleOnPage',
            type: 'class',
            data: actionData
        }, 'JSON')
    }
    async changeSortModuleOnPage(actionData){
			const _ = this;
			let response = await  _.handler({
				method: 'changeSortModuleOnPage',
				type: 'class',
				data: actionData
			}, 'JSON');
			console.log(response)
			return response;
    }
}