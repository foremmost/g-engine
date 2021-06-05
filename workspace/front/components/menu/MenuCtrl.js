import { Ctrl } from '../main/Ctrl.js';
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";
export class MenuCtrl  extends Ctrl  {
    constructor(model,view){
        super(model,view);
        const _ = this;
        _.componentName = 'Menu';
        MainEventBus.add(_.componentName,'getPage',_.getPage.bind(_));
    }
    async getPage(clickObj) {
			const _ = this;
			let
				body = _.view.contentBody,
				item = clickObj['item'],
				page = item.dataset.page;
			if(page == history.state){
				return;
			}
			body.className = 'page-body';
			clickObj['event'].stopImmediatePropagation();
			_.view.menu.querySelector('menu').querySelectorAll('.active').forEach( (el) => el.classList.remove('active'));
			item.classList.add('active');
			MainEventBus.trigger('Loader', 'getRequestPage', {
				'page': page
			});
    }
}