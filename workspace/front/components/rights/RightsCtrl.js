import {Ctrl} from '../main/Ctrl.js';
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";

export class RightsCtrl  extends Ctrl  {
    constructor(model,view){
        super(model,view);
        const _ = this;
        _.componentName= 'Rights';
        //
				MainEventBus
					.on(_,'getModules')
					.on(_,'getActions')
					.on(_,'getModulesToAvail')
					.on(_,'getModulesToAvail')
					.on(_,'choosePage')
					.on(_,'chooseGroup')
					.on(_,'changeActionAvail')
					.on(_,'changeModuleOnPage')
					.on(_,'changeSortModuleOnPage')



    }

    async changeActionAvail(changeData){
        const _ = this;
        let item  = changeData['item'];
        let rightsGroup = systemConts['content'].querySelector('.rights-group-select'),
            groupId = parseInt(rightsGroup.options[rightsGroup.selectedIndex].value),
            actionData = {
                'groupId': groupId,
                'actionId': item.dataset.id,
                'access': item.checked
            };
         await _.model.changeActionAvail(actionData);
    }
    async changeModuleOnPage(changePage){
        const _ = this;
        let item = changePage['item'];
        let rightsGroup = systemConts['content'].querySelector('.rights-page-select'),
            pageId = parseInt(rightsGroup.options[rightsGroup.selectedIndex].value),
            actionData = {
                'pageId': pageId,
                'moduleId': item.dataset.id,
                'access': item.checked
            };
       await _.model.changeModuleOnPage(actionData);
    }
    async changeSortModuleOnPage(changePage){
			const _ = this;
			let item = changePage['item'];
			let rightsGroup = systemConts['content'].querySelector('.rights-page-select'),
			pageId = parseInt(rightsGroup.options[rightsGroup.selectedIndex].value),
			actionData = {
				'pageId': pageId,
				'id': item.dataset.id,
				'sort': item.value
			};
		 await _.model.changeSortModuleOnPage(actionData);
    }


    async choosePage(changePage){
        const _ = this;
        let item = changePage['item'],
            pageId = item.value;
        return await _.getModulesToAvail({'pageId': pageId});
    }
    async chooseGroup(changeObj){
        const _ = this;
        let item = changeObj['item'];
        let groupId = item.value;
        return _.getActions({'groupId':groupId});
    }
    async getActions(pagesData){
        const _ = this;
        let response = await _.model.getActions(pagesData);

        if (response.status === 'success'){
            await MainEventBus.trigger(_.componentName, 'loadActionsToChangeAvail', response['data']);
        }
    }

    async getModules(){
        const _ = this;
        let response = await _.model.getModules();
        if (response.status === 'success'){
            await MainEventBus.trigger(_.componentName, 'loadModulesToChangeAvail', response['data']);
        }
    }
    async getModulesToAvail(pagesData){
        const _ = this;
        let response = await _.model.getModulesToAvail(pagesData);
        if(response.status === 'success'){
            await MainEventBus.trigger(_.componentName, 'loadModulesToChangeAvail', response['data']);
        }
    }


}