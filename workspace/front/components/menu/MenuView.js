import { View } from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";
import { gsap as TweenMax } from "../../libs/GreenSock.lib.js";
import {Functions} from "../../libs/Functions.lib.js";
export class MenuView extends View {
  constructor(model){
    super(model);
    const _ = this;

    _.componentName = 'Menu';
    _.modulePage =  'menu';
    _.tpl = null;
    //MainEventBus.add('Loader','modulesLoaded',_.render.bind(_),'MenuViewLoaderRender');
    MainEventBus
			.add('User','showMoreInfo',_.reDrawMenu.bind(_))
			.add(_.componentName,'showContext',_.showContext.bind(_))
			.add(_.componentName,'hideContext',_.hideContext.bind(_))
			.add(_.componentName,'showMenu',_.showMenu.bind(_),'MenuShowMenu')
			.on(_,'overMenuItem')
			.on(_,'outMenuItem')
			.on(_,'collapseMenu')
    _.menuShowed = false;
    _.menuAnimated = true;
    _.itemShowed = false;
    _.collapsed = false;
  }
	collapseMenu(){
		const _ = this;
  	if(!_.collapsed){
			TweenMax.to('menu-item span', .35, {'width': 0,opacity:0,display:'none',alpha:true});
			_.collapsed = true;
		}	else {
  		TweenMax.to('menu-item span', .35, {'width': (cnt,item)=>{return item.getAttribute('data-width')},opacity:1,display:'block',alpha:true});
			_.collapsed = false;
		}
	}
	overMenuItem(overData){
		const _ = this;
  	let
			item = overData['item'],
			span = item.querySelector('span'),
			itemWidth = span.offsetWidth + 50;
			TweenMax.to(item, .35, {width: itemWidth});
			_.itemShowed = true;
	}
	outMenuItem(outData){
		const _ = this;
		//outData['event'].stopPropagation();
		let
			item = outData['item'];
		let relatedTarget = outData['event'].relatedTarget;
		while (relatedTarget) {
			if (relatedTarget == item) return;
			relatedTarget = relatedTarget.parentNode;
		}
		TweenMax.to(item, .35,{width: 45});
		_.itemShowed = false;
	}
	showMenu(clickData){
  	const _ = this;
  	let burger = clickData['item'];
  	if (!_.menuShowed ){
		  burger.classList.add('active');
		  TweenMax.to('menu-place',.5,{
			  x: 0
		  });
		  TweenMax.to('menu',.5,{
			  x: 0, delay:1.2
		  });
		  _.menuShowed = true;
	  }else{
		  burger.classList.remove('active');
		  TweenMax.to('menu-place',.5,{
			  x: -1200
		  });
		  TweenMax.to('menu',.5,{
			  x: -1200, delay:0
		  });
		  _.menuShowed = false;
	  }
  }
  hideContext(){
    document.body.querySelector('menu-context').remove();
    document.body.querySelector('.context-shadow').remove();
  }
  async showContext(contextObj){
    const _ = this;
    let
      event  = contextObj['event'];
    if(document.querySelector('core').querySelector('menu-context'))
      document.querySelector('core').querySelector('menu-context').remove();
    let tpl = _.contextTpl();
    MainEventBus.trigger('languager','loadTranslate',tpl);

    tpl.style.top = event.clientY+'px';
    tpl.style.left = event.clientX+'px';

    document.querySelector('core').append(
    	_.el('DIV',{
    		class:'context-shadow',
				'data-click-action':'Menu:hideContext'
			}));
    document.querySelector('core').append(tpl);
  }
  async loadMenuItems(){
    const _ = this;
    _.menuItems = [];
    let items =  await _.model.getMenuItems();
    for(let item of items['data']){
      let itemTpl = _.menuItemTpl(item,history.state);
			_.menuItems.push(itemTpl);
    }
    return _.menuItems;
  }
  setItemsWidth(){
  	const _ = this;
		_.menuItems.forEach( (item)=>{
			item.setAttribute('data-width',item.getBoundingClientRect().width);
		});
	}
  burgerTpl(){
  	const _ = this;
  	return _.el('MENU-BURGER',{
  		'data-click-action':`${_.componentName}:showMenu`
	  });
  }
  placeTpl(){
  	const _ = this;
  	return _.el('MENU-PLACE');
  }
  contextTpl(){
    const _ = this;
    return _.el('MENU-CONTEXT',{
      childes:[
          _.el('MENU-CONTEXT-ITEM',{
            'data-word':'Edit word'
          })
      ]
    });
  }
  menuItemTpl(menuItemData,page=''){
    const _ = this;
    let cls = '';
    if (page === menuItemData.name){
      cls = 'active';
    }
    let word = menuItemData['name'],
        img = word;
    if (img == 'home'){
      img = 'main'
    }
    return _.el('MENU-iTEM',{
    	class:cls,
			'data-click-action':'Menu:getPage',
			'data-page':`${menuItemData['name']}`,
			childes:[
				_.el('MENU-ITEM-NOTIFICATIONS'),
				_.el('IMG',{
					src:`/workspace/img/${img}.svg`
				}),
				_.el('SPAN',{'data-word':`${word}`})
			]
		});
  }
  async pageTpl(){
    const _ = this;
    return new Promise( async function (resolve) {
      if(systemConts['menu'].querySelector('menu')) {
        resolve(true);
        return ;
      }
      Functions.showLoader(_.menu);
			let buffer = _.el('MENU',{
				prop:'menuCont',
				childes:[
					_.burgerTpl(),
					_.placeTpl(),
					_.el('MENU-LIST',{
						childes:	[
						...await _.loadMenuItems(),
						_.el('MENU-ITEM',{'data-click-action':`${_.componentName}:collapseMenu`,childes:[
								_.el('IMG',{src:`/workspace/img/hide.svg` })
						]}),
						_.el('MENU-ITEM',{class:'menu-exit','data-click-action':`User:userOut`,childes:[
								_.el('IMG',{src:`/workspace/img/exit.svg` })
						]})
						]
					}),
				//	_.el('BUTTON',{ 'type':'button','data-click-action':`${_.componentName}:userOut`,'data-word':'Exit'})
				]
			});
			_.menu.append(buffer);
			_.setItemsWidth();
      Functions.hideLoader(_.menu);
      _.tpl =  systemConts['menu'];
       resolve(buffer);
    });
  }

  reDrawMenu(){
    const _ = this;
    let tplSizes = _.tpl.getBoundingClientRect(),
        menuItems = _.tpl.querySelectorAll('menu-item'),
        menuItemsS = _.tpl.querySelectorAll('menu-item span'),
        itemsCnt = menuItems.length;
    if(!_.menuWidth)  _.menuWidth = systemConts['menu'].offsetWidth;
	  let tl = new TweenMax.timeline();
	
	  if(_.menuAnimated){
	    if(!_.menuShowed){
	      _.menuShowed = true;
		    tl.add([
			    TweenMax.to(_.head,.75,{x:'5%',width:'93%'}),
			    TweenMax.to(_._content,.75,{x:'5%',width:'93%'}),
					TweenMax.to(_.menu,.75,{width:`160px`}),
					TweenMax.to(menuItemsS,.25,{
						width:'150px',
						opacity: 1,
						marginLeft:'10px',
						visibility: 'visible',
						display:'block',
					}),
					TweenMax.to(menuItems,{
						flexDirection: 'row'}),
					TweenMax.to(menuItems,.25,{
						stagger: .05,
						width:'100%',
						borderRadius:'0',
						padding: '0 15px',
					})
				]).call( ()=>{_.menuAnimated = true});
	    }else{
		    tl.add([
			    TweenMax.to(_.menu,.5,{width:_.menuWidth}),
			    TweenMax.to(menuItems,.5,{
					flexDirection: 'column',
			    stagger: 0.5 / itemsCnt,
					width:'45px',
					borderRadius:'100%',
			    ease: "Power3.easeIn",
					padding: '7px 0'
		    	}),
					TweenMax.to(menuItemsS,.5,{
						width:0,
						display:'none',
						opacity: 0,
						marginLeft:'0',
						visibility: 'hidden'
					}),
		      TweenMax.to(_.head,.75,{x:'0%',width:'97.5%'}),
		      TweenMax.to(_._content,.75,{x:'0%',width:'97.5%'}),
	      ],">0").call( ()=>{_.menuAnimated = true});
		    _.menuShowed = false;
	    }
	  }
	  _.menuAnimated = false;
  }
  ///

  render(page){
		const _ = this;
		return new Promise(async function (resolve) {
			if(page !== '/'){
				_.clearContent();
			
				Functions.showLoader(_.contentHead);
				Functions.showLoader(_.contentBody);
				
				resolve( await _.pageTpl(page));
				let tabs =  _.head.querySelector('core-tabs');
				if (tabs){
					tabs.remove();
				}
				Functions.hideLoader(_.contentHead);
				Functions.hideLoader(_.contentBody);
			}else{
				resolve(true);
			}
		})
	}
}