import { Module } from "../main/Module.js";
import { ContenterModel } from "./ContenterModel.js";
import { ContenterView } from "./ContenterView.js";
import { ContenterCtrl } from "./ContenterCtrl.js";

export class Contenter extends Module {
    constructor(){
        let
            model = new ContenterModel(),
            view = new ContenterView(model),
            ctrl = new ContenterCtrl(model, view);
        super(view,ctrl,model);
        const _ = this;
    }
    async init(page){
        const _ = this;
        return await _.view.render(page);
    }
}