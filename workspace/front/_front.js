import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { View } from "./components/main/View.js";
import { Ctrl } from "./components/main/Ctrl.js";
export class _front{
  constructor() {
    const _ = this;
    _.componentName = 'front';
    _.view = new View(null);
    _.ctrl = new Ctrl(null, _.view, {
      container: document.querySelector('body')
    });
    _.libs = new Map();
    _.components = new Map();
    _.busEvents= [
      'registerUser', 'frontLogin','frontLogout','chooseLang','createOrder'
    ];
    //
    //MainEventBus.on(_,'watcher');
    MainEventBus.add(_.componentName,'createOrder',_.createOrder.bind(_));
    //
    _.init();
  }
  getModule(moduleData){
    const _ = this;
    return new Promise(async function (resolve) {
      let
          modules = moduleData.module,
          name = moduleData.name.toLowerCase(),
          params = moduleData.params ? moduleData.params : {},
          dir = moduleData.dir ? '/'+moduleData.dir : '',
          page = moduleData.page ? moduleData.page : null,
          type = moduleData.type ? moduleData.type : 'lib',
          moduleStr = name.charAt(0).toUpperCase() + name.substr(1),
          path = `/workspace/front/libs/${moduleStr}.lib.js`;
      if (_.components.has(name)) {
        resolve(_.components.get(name));
      }
      if(type !== 'lib'){
        //path = `/workspace/front/components/${name}/${moduleStr}.js`;
        path = `/workspace/front/components/${name}${dir}/${moduleStr}.js`;
      //  if (moduleData.dir) path = `/workspace/front/components/${name}/${moduleData.dir}/${moduleStr}.js`;
      }
      const
          module = await import(path);

      for (let modul of modules){
        let modulName;
        if (modul['type'] == 'constructor'){
          modulName = new module[modul['name']](modul['page'], modul['params']);
        }else{
          modulName =  module[modul['name']];
        }
        _[modul['name']] = modulName;
        resolve(modulName);
        _.components.set(modul['name'], modulName);
      }
    });
  }
  formDataCapture(form){
    return new Promise(function (resolve) {
      let
          outData = {},
          formElements = form.elements;
      for(let element of formElements){
        if(element.type === 'radio'){
          if (element.checked){
            outData[element.name] = element.value;
          }
        }else if (element.name){
          outData[element.name] = element.value;
        }
      }
      resolve(outData);
    });
  }
  async registerUser(submitData){
    const _ = this;
    let
        form = submitData['item'],
        user = await _.getModule({
          name: 'user',
          params: {'container':document.querySelector('body')},
          type:'component'
        }),
        userData =  _.formDataCapture(form),
        response = await user.registerUser(userData);
    if(response['status'] === 'success'){
      _.registerUserSuccess(response);
    }else{
      _.registerUserFail(response);
    }
  }
  registerUserSuccess(response){}
  async frontLogin(e){
    const _ = this;
    let form = e.item,
        auther = await _.getModule({
	        name: 'auther',
	        type: 'component',
	        module: [{'container': document.querySelector('body'),name:'Auther',type:'constructor'}]
        }),
        storage = await _.getModule({
	        type:'lib',
	        name: 'storage',
	        module:[{name:'Storage',type:'function'}]
        });
    let authData= await _.formDataCapture(form);
    let response = await auther.frontLogin(authData);
    if (response.status == 'success'){
    	 storage.save('token',response['data']['token']);
	     MainEventBus.trigger('front','loginSuccess',response['data']);
    }else{
	    MainEventBus.trigger('front','loginFail',response['data']);
    }
  }
  async frontLogout(e){
    const _ = this;
    let form = e.item,
        auther = await _.getModule('auther',{'container':document.querySelector('body')});
    let authData= _.formDataCapture(form);
    let response = await auther.logout(authData);
    console.log(response);
    if (response.status == 'success'){
      location.reload();
    }
  }
  async checkSession(){
  	const _ = this;
  	let storage = await _.getModule({
		  type:'lib',
		  name: 'storage',
		  module:[{name:'Storage',type:'function'}]
	  });
  	return storage.has('token');
  }
  addToCart(){
  	const _ = this;
  }
  
  chooseLang(clickObj){
    clickObj['event'].preventDefault();
    let pageSelect = document.querySelector('.page-select');
    pageSelect.classList.toggle('open')
  }
  async createOrder(submitData){
    const _ = this;
    let
        form = submitData['item'],
        formData = await _.formDataCapture(form),
        crm = await _.getModule({
					type: 'component',
					name: 'crm',
					module :[ {'container':document.querySelector('body'),name:'Crm',type:'constructor'}]
        });
    let response = await crm.createOrder(formData);
    if(response['status'] === 'success'){
      return MainEventBus.trigger(_.componentName,'createOrderSuccess',response['data']);
    }
    return MainEventBus.trigger(_.componentName,'createOrderFail',response);
  }
  async watcher(){
  	const _ = this;
  	let i = 0;
  	let check = await _.checkSession();
  	if (check){
		  
	    _.watcherInt = setInterval(function(){
	      console.log(++i);
		  },5000);
	  }
  }
  init(){
    const _ = this;
    _.query = (selector) => document.querySelector(selector);
    _.queryAll = (selector) => document.querySelectorAll(selector);
   
  }
	
}