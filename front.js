import { MainEventBus } from "./workspace/front/libs/MainEventBus.lib.js";
import { _front } from "./workspace/front/_front.js";
import { Slider } from './workspace/front/components/slider/frontend/slider.js';

class Front extends _front{
  constructor(){
    super();
    const _ = this;
    //MainEventBus.trigger(_.componentName,'watcher');
    MainEventBus
      .on(_,'createOrderSuccess')
      .on(_,'createOrderFail')
      .on(_,'frontLogin')
      .on(_,'loginSuccess')
      .on(_,'loginFail')
      .on(_,'addToCart')
		
  }
  async addToCart(clickData){
  	const _ = this;
  	let
			btn = clickData['item'],
			goodsId = btn.getAttribute('data-id'),
			goodsCnt = 1,
			goodsCntInput = document.querySelector('.goods-cnt');
  	if(goodsCntInput){
  		goodsCnt = goodsCntInput.value;
		}
  	let rawCrm = await _.getModule({
			name: 'Crm',
			type: 'component',
			module: [{name:'Crm',type:'component'}]
		});
  	let crm = new rawCrm();
		let response = await crm.addToCart({
			goods_id: parseInt(goodsId),
			cnt: parseInt(goodsCnt)
		});
		console.log(response);
	}
	async callConsultant(){
		const _ = this;
		let frontConsultant = await _.getModule({
			name: 'Consultant',
			type: 'component',
			dir: 'frontend',
			module: [{'container': document.querySelector('body'),name:'Consultant',type:'func'}]
		});
		new frontConsultant();
	}

  createOrderSuccess(orderData){
    console.log(orderData);
  }
  createOrderFail(orderData){
		console.warn(orderData);
	};
	
  loginSuccess(loginData){
  	const _ =  this;
  	console.log(loginData);
  }
  loginFail(loginData){
  	const _ =  this;
  	console.error(loginData);
  }
  init(){
  	const _ = this;
	  _.callConsultant();
  }
}
new Front();


