import { View } from "../main/View.js";
import { systemConts } from "../../libs/Conts.lib.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
export class AutherView extends View {
    constructor(){
			super();
			const _ = this;
			_.buffer = '';
			_.modulePage =  '/';
			_.componentName = 'Auther';
			MainEventBus
				.on(_, 'outFocus')
				.on(_, 'checkLoginSuccess')
				.on(_, 'checkLoginFail')
				.on(_, 'backToLogin')
				.on(_, 'loginSuccess')
				.on(_, 'loginFail');
    }
    loginSuccess(data){
        systemConts['main'].classList.add('login');
        setTimeout( ()=>{
            //systemConts['main'].querySelector('.form-c').classList.add('pos');
            setTimeout(function () {
                MainEventBus.trigger('Loader','loadCarcass',null);
                setTimeout(function () {
                	MainEventBus.trigger('Loader','systemEntry',data);
                },500)
            },1000);
        },1000);
    }
    loginFail(){
			const _ = this;
			let inptRow = systemConts['main'].querySelector('.form-inpt-row');
			_.nextBtn.querySelector('use').setAttribute('xlink:href','#error')
			inptRow.classList.add('err');
			inptRow.classList.remove('load');
		}
    backToLogin(){
    	const _ = this;
			let
				inptRow = systemConts['main'].querySelector('.form-inpt-row'),
				inpt = systemConts['main'].querySelector('.form-inpt'),
				btn = systemConts['main'].querySelector('.form-btn'),
				title = systemConts['main'].querySelector('.form-inpt-title');
			btn.setAttribute('data-click-action',"Auther:check");
			btn.setAttribute('data-step',"1");
			title.removeAttribute('data-lang');
			title.setAttribute('data-word',"Login");
			inpt.setAttribute('type',"text");
			inpt.classList.remove('password');
			inptRow.classList.remove('err');
			inptRow.classList.remove('load');
			inpt.value = '';
			inpt.setAttribute('data-keyup-action','Auther:keyUpLogin');
			MainEventBus.trigger('languager','loadTranslate',inptRow);
	
			_.nextBtn.querySelector('use').setAttribute('xlink:href','#next')
			_.clearBtn.classList.remove('active');
			_.outFocus(inpt);
		}
    checkLoginSuccess(){
			const _ = this;
			let
				inptRow = systemConts['main'].querySelector('.form-inpt-row'),
				inpt = systemConts['main'].querySelector('.form-inpt'),
				btn = systemConts['main'].querySelector('.form-btn'),
				title = systemConts['main'].querySelector('.form-inpt-title');
			btn.setAttribute('data-click-action',"Auther:second");
			btn.setAttribute('data-step',"2");
			title.removeAttribute('data-lang');
			title.setAttribute('data-word',"Password");
			inpt.setAttribute('type',"Password");
			inpt.classList.add('password');
			inptRow.classList.remove('err');
			inptRow.classList.remove('load');
			inpt.value = '';
			inpt.setAttribute('data-keyup-action','Auther:keyUpPass');
			MainEventBus.trigger('languager','loadTranslate',inptRow);
	
			_.nextBtn.querySelector('use').setAttribute('xlink:href','#next')
			_.clearBtn.classList.remove('active');
			_.backBtn.classList.add('active');
			_.outFocus(inpt);
    }
    checkLoginFail(){
        const _ = this;
        let inptRow = systemConts['main'].querySelector('.form-inpt-row'),
            inpt = systemConts['main'].querySelector('.form-inpt'),
            title = systemConts['main'].querySelector('.form-inpt-title');
        title.removeAttribute('data-lang');
        title.setAttribute('data-word',"Wrong login");
				_.nextBtn.querySelector('use').setAttribute('xlink:href','#error')
        inptRow.classList.add('err');
        inptRow.classList.remove('load');
        MainEventBus.trigger('languager','loadTranslate',inptRow);
        _.outFocus(inpt);
    }
    outFocus(focusData) {
        let item = focusData['item'];
        if (!item) return;
        item.value ? item.classList.add('hide') : item.classList.remove('hide');
    }
    pageTpl(){
			const _ = this;
			let el = _.el(
			'DIV',{
				class:'form-c',
				childes:[
					_.el('DIV',{
						class:'form-left',
						childes:[
							_.el('H1',{
								class:'form-logo',
								childes:[
									_.el('SPAN',{
										childes:[
											_.el('IMG',{
												src:'img/logo_text.svg'
											})
										]
									})
								]
							})
						]
					}),
					_.el('DIV',{class:'form-right',childes:[
						_.el('FORM',{
							class:'form-cont',
							childes:[
								_.el('DIV',{
									class:'form-inpt-row',
									childes:[
										_.el('DIV',{
											class:'form-inpt-c',
											childes:[
												_.el('SPAN',{
													class:'form-inpt-title',
													'data-word':'Login'
												}),
												_.el('INPUT',{
													class:'form-inpt form-inpt-field',
													type:'text',
													'data-keyup-action':`${_.componentName}:keyUpLogin`,
													'data-outfocus-action':`${_.componentName}:outFocus`
												})
											]
										}),
										_.el('DIV',{
											class:'form-btn-c',
											childes:[
												_.el('BUTTON',{
													prop: 'nextBtn',
													class:'form-btn form-in-btn',
													type:'button',
													'data-step':1,
													'data-click-action':`${_.componentName}:check`,
													childes:[
														_.el('SVG',{
															class:'icon',
															html:`<use xlink:href="#next"></use>`
														})
													]
												}),
												_.el('BUTTON',{
													class:'form-btn form-clear-btn',
													prop:'clearBtn',
													type:'button',
													'data-step':1,
													'data-click-action':`${_.componentName}:clearInpt`,
													childes:[
														_.el('SVG',{
															class:'icon',
															html:`<use xlink:href="#clear"></use>`
														})
													]
												}),
												_.el('BUTTON',{
													class:'form-btn form-back-btn',
													prop:'backBtn',
													type:'button',
													'data-step':1,
													'data-click-action':`${_.componentName}:clearInpt;${_.componentName}:backToLogin`,
													childes:[
														_.el('SVG',{
															class:'icon',
															html:`<use xlink:href="#back"></use>`
														})
													]
												})
											]
										})
									]
								})
							]
						}),
					]})
				]
			});
			systemConts['main'].classList.add('form-in');
			systemConts['main'].append(el);
			return el;
    }
    render(page){
			const _ = this;
			if( page === _.modulePage){
				let tpl = _.pageTpl();
				MainEventBus.trigger('Auther','pageTplLoaded',tpl);
			}
    }
}