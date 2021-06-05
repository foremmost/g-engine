import { Ctrl } from "../main/Ctrl.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
export class AutherCtrl  extends Ctrl  {
    constructor(model,view,params){
        super(model,view,params);
        const _ = this;
        _.componentName = 'Auther';
        MainEventBus
					.on(_,'keyUpLogin')
					.on(_,'keyUpPass')
					.on(_,'clearInpt')
					.on(_,'check')
					.on(_,'second');
    }
		clearInpt(clickData){
    	const _ = this;
    	let inptField = _.container.querySelector('.form-inpt-field');
    	inptField.value = '';
    	clickData['item'].classList.remove('active');
		}
    showLoader(){
    	const _ = this;
			let loginCont = _.container.querySelector('.form-inpt-row');
			loginCont.classList.add('load');
		}
		showClearBtn(canShow){
			const _ = this;
			if(canShow){
				_.view.clearBtn.classList.add('active')
			}else{
				_.view.clearBtn.classList.remove('active');
			}
		}
    async keyUpLogin(inputData){
        const _ = this;
        let
					event = inputData['event'],
					item = inputData['item'];
      	_.showClearBtn(item.value);
        if ( (event['key'] === 'Enter')) {
            let login = _.container.querySelector('.form-inpt');
            _.showLoader();
            return await _.model.checkLogin({'step':1,login:login.value});
        }
    }
    async keyUpPass(inputData){
			const _ = this;
			let
				event = inputData['event'],
				item = inputData['item'];
			_.showClearBtn(item.value);
			if ( (event['key'] === 'Enter')) {
				let pass = _.container.querySelector('.form-inpt');
				_.showLoader();
				return await _.model.loGin({'step':2,pass:pass.value});
			}
    }
    async check(clickObj){
        const _ = this;
        let elem = clickObj['item'];
        let step = parseInt(elem.dataset.step),
            login = _.container.querySelector('.form-inpt');
				_.showLoader();
        return await _.model.checkLogin({'step':step,login:login.value});
    }
    async second(clickObj){
        const _ = this;
        let elem = clickObj['item'];
        let step = parseInt(elem.dataset.step),
            pass = _.container.querySelector('.form-inpt');
					_.showLoader();
        return await _.model.loGin({'step':step,pass:pass.value});
    }
}