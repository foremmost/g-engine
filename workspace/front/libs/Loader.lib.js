import {Functions} from "./Functions.lib.js";
import {_Fetch} from "./Fetch.lib.js";
import {MainEventBus} from "./MainEventBus.lib.js";
import {systemConts} from "./Conts.lib.js";
import {gsap as TweenMax} from "./GreenSock.lib.js";
window['bus'] = MainEventBus;
export class Loader {
	constructor(){
		const _ = this;
		_.xhr = new _Fetch();
		_.components = new Map();
		_.dirFunctionsPath  = '/workspace/front/core/functions/';
		_.modules = new Map();
		_.componentName = 'Loader';
		MainEventBus
			.add('User','enteredAsGuest',_.loadPage.bind(_),'LoaderAsGuest')
			.add('User','enteredAsUser',_.loadPage.bind(_),'LoaderAsUser')
			.add('Loader','systemEntry',_.modulesLoaded.bind(_),'Loader')
			.on(_,'getRequestPage')
			.on(_,'loadPage')
			.on(_,'loadCarcass')
			.on(_,'contentUp')
			.on(_,'contentDown');
		_.rendered = [];
		_.systemComponents = ['User','Menu','Log','Settings','Languager'];
	}
	moveContent(){
		const _ = this;
		let tabs = systemConts['main'].querySelector('core-tabs');
		if (tabs){
			_.contentDown();
		}else{
			_.contentUp();
		}
	}
	contentUp(){
		const _ = this;
		TweenMax.set(systemConts['content'],{duration:0,'height':'calc(100% - 20px)'});
		//TweenMax.to(systemConts['content'],1,{y:0,'min-height':'calc(100vh - 170px)'});
		TweenMax.to(systemConts['content'],1,{y:0});
	}
	contentDown(){
		const _ = this;
		TweenMax.set(systemConts['content'],{duration:0,'height':'calc(100% - 63px)'});
		//TweenMax.to(systemConts['content'],1,{y:40,'min-height':'calc(100vh - 170px)'});
		TweenMax.to(systemConts['content'],1,{y:40});
	}
	async includeComponent(name,style,page,render=false){
		const _ = this;
	//	if (_.components.has(name)) return;
		if(style){
			await _.includeStyleSheets(name);
		}
		let moduleStr = name.charAt(0).toUpperCase() + name.substr(1), modulName;
		if(!_.components.has(moduleStr)){
			const
					module = await import(`../components/${name.toLowerCase()}/${moduleStr}.js`);
					modulName = new module[moduleStr](page);
			await modulName.init(page);
			_.components.set(moduleStr,modulName);
		}else{
			modulName = _.components.get(moduleStr);
		}
		if(render){
			modulName.view.render(page);
		}
		return Promise.resolve(modulName);
	}
	async includeStyleSheets(modul){
		const _ = this;
		let style = await _.xhr.fetch('JSON',{
			path: '/front/components/main/assets/includeStylesheets.php',
			data:{
				module: modul
			}
		});
		let head = document.querySelector('head');
		head.insertAdjacentHTML('beforeend',style);
	}
	async getPage(pageInfo){
		const _ = this;
		let req = await _.xhr.fetch('GET',{
			'path': _.dirFunctionsPath+'getUserPage.php',
			'data': pageInfo
		});
		return req;
	}
	async changeState(req){
		const  _ = this;
		let url = req.url;
		if(url){
			if(url.indexOf('workspace') < 0){
				url= '/workspace' + url;
			}
		}
		history.replaceState(req.page,req.title,url);
	}
	async loadCarcass(){
		const _ = this;
		let carcass = await  _.xhr.fetch('GET',{
			path: 'front/libs/libsData/getCarcass.php'
		});
		systemConts['main'].insertAdjacentHTML('afterbegin',carcass['tpl']);
		systemConts['menu'] = systemConts['main'].querySelector('core-menu');
		systemConts['head'] = systemConts['main'].querySelector('core-head');
		systemConts['body'] = systemConts['main'].querySelector('core-body');
		systemConts['content'] = systemConts['main'].querySelector('core-content');
		systemConts['foot'] = systemConts['main'].querySelector('core-foot');
		
	}
	modulesLoaded(userInfo){
		const _ = this;
		if(userInfo['data']['page'] != '/' && systemConts['main'].querySelector('.form-c')) {
			systemConts['main'].classList.add('out');
			systemConts['main'].classList.add('form-out');
			setTimeout(function () {
				systemConts['main'].querySelector('.form-c').remove();
				systemConts['main'].className = 'mbottom';
				_.getRequestPage(userInfo['data'],document.body);
			}, 1200)
		}
	}
	clearComponents(arr,modules){
		const _ = this;
		for(let component of _.components){
			if(_.isSystemComponent(component[0])){
				continue;
			}
			//debugger
			if(arr.indexOf(component[0]) > -1) {
				modules.splice(modules.indexOf(component[0]),1);
				continue;
			}
		//	let EventComponentName = component[0][0].toUpperCase() + component[0].slice(1,);
			let EventComponentName = component[0].toLowerCase();
			delete MainEventBus.components[EventComponentName];
			_.components.get(component[0]).remove();
			_.components.set(component[0],null);
			_.components.delete(component[0]);
		}
		//console.log(arr)
	}
	isSystemComponent(componentName){
		if(this.systemComponents.indexOf(componentName) > -1){
			return true;
		}
		return false;
	}
	renderComponents(modules,pageInfo){
		const _ = this;
		return  new Promise(async function (resolve) {
			if (modules) {
				while (modules.length) {
					let module = modules[0];
					await _.includeComponent(module, false, pageInfo.page);
					_.rendered.push(module);
					modules.splice(modules.indexOf(module), 1);
				}
			}
			resolve(_.rendered);
		});
	}
	systemRender(pageInfo){
		const _ = this;
		return new Promise( async function (resolve) {
			for (let componentName of _.systemComponents){
				//console.log(`Rendered: ${componentName}`);
				let component = _.components.get(componentName);
				await component.view.render(pageInfo['page']);
				_.rendered.push(componentName);
			};
			resolve(_.components);
		})
	}
	async getRequestPage(pageInfo,cont){
		const _ = this;
		_.rendered = [];
		if(history.state === pageInfo['page']) return ;
		let responsePage = await _.getPage(pageInfo);
		if (!responsePage.access){
			MainEventBus.trigger('Log','showLog',{
				status:'error',
				title:'Access denied'
			});
			return;
		}
		let modules = responsePage['modules'],
				arr = [];
		_.clearComponents(arr,modules);
		if (modules){
			for(let component of modules){
				if(_.components.has(component)){
					delete MainEventBus.components[component];
					arr.push(component);
					continue;
				}
			}
		}
			await _.systemRender(pageInfo);
			await _.renderComponents(modules,pageInfo);
			_.changeState(pageInfo);
		_.moveContent();
		MainEventBus.trigger('Loader','pageReady',cont ? cont : systemConts['content']);
		_.rendered = [];
	}
	async loadPage(pageInfo){
		const  _ = this;
		let responsePage = await _.getPage(pageInfo),
				modules = responsePage['modules'];
		await _.includeComponent('Menu',false,pageInfo.page,true);
		await _.includeComponent('Settings',false,pageInfo.page);
		await _.includeComponent('Log',false,pageInfo.page);
		if (!responsePage.access){
			MainEventBus.trigger('Log','showLog',{
				status:'error',
				title:'Access denied'
			});
			return false;
		}
		_.changeState(pageInfo);
		await _.includeComponent('Languager',false,pageInfo.page,true);
    if (modules){
      for(let module of modules){
        if(!_.components.has(module)){
          await _.includeComponent(module,false,pageInfo.page);
        }
      }
    }
   
    _.moveContent();
		MainEventBus.trigger('Loader','modulesLoaded',pageInfo.page);
	}
	async init(){
		const _  = this;
		//
		return new Promise( async function (resolve) {
			await _.includeComponent('User',false,history.state);
			resolve(true);
		});
	}
}