import { Ctrl } from '../main/Ctrl.js';
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import { Functions } from "../../libs/Functions.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";
export class CustomersCtrl  extends Ctrl  {
    constructor(model,view){
			super(model,view);
			const _ = this;
			_.componentName = 'Customers';
			_.busEvents = [
				''
			];
			MainEventBus
				.on(_,'calcItemsCount')
				.on(_,'inputSearchQuery')
				.on(_,'keyUpSearch')
				.on(_,'btnSearch')
				//
				.on(_,'saveUser')
				.on(_,'editUser')
				.on(_,'showCustomer')
				.on(_,'editCustomer')
				.on(_,'deleteCustomer')

				.on(_,'changeFieldValue')
				//  Работа с пагинацией
				.on(_,'calcItemsCount')
				.on(_,'nextPage')
				.on(_,'prevPage')
				.on(_,'goPage')
				.on(_,'deleteMainThumb')
				.on('filer','changeFile',_.changeThumbnail.bind(_),'CustomersCtrl');
			_.formStyles = {
				'border-radius': '5px',
				padding: '15px 10px'
			}
    }
		changeThumbnail(fileData){
			const _ = this;
			let file = fileData[0],
			src = file['src'];
			_.view.photo.src = src;
			_.view.photo.setAttribute('data-src',file['fullPath']);
		}
		deleteMainThumb(){
			const _ = this;
			_.view.photo.removeAttribute('src');
			_.view.photo.removeAttribute('data-src');
			
			_.view.show(_.view.addMainThumbBtn);
			_.view.hide(_.view.deleteMainThumbBtn);
			_.view.photo
		}
    changeFieldValue(inputData){
        const _ = this;
        let item = inputData['item'],
            fieldName = item.name,
            fieldValue = item.value;
        if(Functions.deepEqual(_.model.currentItem[fieldName],fieldValue)){
           delete _.model.editedFields[fieldName];
        }else{
            _.model.editedFields[fieldName] = fieldValue;
        }

    }
    async editUser(eventData) {
        const  _ = this;
        let form =  eventData['item'],
            user =  _.createFormData(form);
        if (user['pass'] !== user['cpass']){
            MainEventBus.trigger('Log','showLog',{
                status:'error',
                title: 'Password not equals'
            });
            return ;
        }
        let response = await _.model.editUser();
        if (response.status === 'success'){
            user['id'] = parseInt(user['uId']);
            let itemData= _.model.updateItem(user);
            return MainEventBus.trigger(_.componentName,'userUpdated',itemData);
        }
        if (response.status === 'fail'){
            MainEventBus.trigger('Log','showLog',{
                status:'error',
                title: response.failText
            })
        }
    }
    async saveUser(eventData){
        const _ = this;
        let form =  eventData['item'],
            user =  _.createFormData(form);
        if(user['pass'] !== user['cpass']){
            MainEventBus.trigger('Log','showLog',{
                status:'error',
                title: 'Password not equals'
            });
            return ;
        }
        let photo = _.view.photo.getAttribute('src');
        if(photo){
        	user['photo'] = photo;
				}
        let response = await _.model.saveUser(user);
        if (response.status === 'success'){
            //MainEventBus.trigger('User','userSaved',response);
            MainEventBus.trigger('Log','showLog',{
                status:'success',
                title: 'User saved'
            });
            _.view.listRowsTpl();
            return ;
        }
        MainEventBus.trigger('Log','showLog',{
            status:'error',
            title: response.failText
        });
    }
    async showCustomer(clickData){
        const _ = this;
        let item = clickData['item'],
            customersId = item.dataset.userId,
            formTpl = await _.view.formToShowTpl(customersId);
        await MainEventBus.trigger('languager','loadTranslate',{
          cont:formTpl
        });
        MainEventBus.trigger('Modaler','showModal',{
            contentType:'object',
            content: formTpl,
            ..._.formStyles
        });
    }
    async editCustomer(clickData){
        const _ = this;
        let item = clickData['item'];
        let customersId = item.dataset.userId;
        _.model.editedFields['id'] = customersId;
				let customerData  = await _.model.getOneItem({itemId:customersId});
        let formTpl = await _.view.formToEditTpl(customerData);
        if (customerData['photo']) {
					_.view.changeThumbnail(customerData['photo'])
				}
        await MainEventBus.trigger('languager','loadTranslate',{cont:formTpl});
        MainEventBus.trigger('Modaler','showModal',{
            contentType:'object',
            content: formTpl,
            ..._.formStyles
        });
    }
    async deleteCustomer(clickData){
        const _ = this;
        let item = clickData['item'];
        let customersId = item.dataset.userId;
        let response  = await _.model.deleteUser({id: customersId});
        if (response.status == 'success'){
            MainEventBus.trigger('Log','showLog',{
                'status': 'success',
                'title':'User deleted',
                'save': true
            });
            item.parentNode.parentNode.parentNode.remove();
        }else{
            MainEventBus.trigger('Log','showLog',{
                'status': 'error',
                'title':'User deleted fail',
                'save': true
            });
        }
    }


}