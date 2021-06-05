import { Module } from "../main/Module.js";
import { FilerModel } from "./FilerModel.js";
import { FilerView } from "./FilerView.js";
import { FilerCtrl } from "./FilerCtrl.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";

export class Filer extends Module {
    constructor(page){
        let
            model = new FilerModel(),
            view = new FilerView(model),
            ctrl = new FilerCtrl(model, view);
        super(view,ctrl,model);
        const _ = this;
        _.componentName = 'filer';
        MainEventBus
          .on(_,'showOnModal')
          .on(_,'confirmChangeFile');
      //  debugger;
    }
    async init(page){
        const _ = this;
        let content =  await _.view.render(page);

    }
    async showOnModal(multiple=false){
        const _ = this;
        return new Promise(async function (resolve) {
	        MainEventBus.trigger("Modaler",'showModal',{
		        'min-width': '90%',
		        content: await _.view.render('modal',multiple)
	        })
	        resolve(true);
        });
    }
    async confirmChangeFile(){
	    MainEventBus.trigger('Modaler','closeLastModal');
    }
}