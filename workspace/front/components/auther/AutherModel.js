import { busTrigger } from "../../libs/MainEventBus.lib.js";
import { Model } from "../main/Model.js";
export class AutherModel extends Model {
    constructor(){
        super();
        const _ = this;
        _.componentName = 'Auther';
        _.login = '';
    }
    async checkLogin(loginData) {
        const _ = this;
        let response = await _.handler({
              method: 'login',
              data: {
                  'login': loginData['login'],
                  'step': loginData['step']
              }
            }
        ,'JSON');
        if(response.status === 'success'){
          _.login = response['data'].login;
          busTrigger(_.componentName,'checkLoginSuccess',response);
        }else{
					busTrigger(_.componentName,'checkLoginFail',response);
        }
    }
    async loGin(loginData){
      const _ = this;
      let response = await _.handler({
				method: 'login',
				data: {
					login: _.login,
					pass: loginData['pass'],
					step: loginData['step']
				}
      },'JSON');
      if(response.status === 'success'){
				busTrigger(_.componentName,'loginSuccess',response);
      }else{
				busTrigger(_.componentName,'loginFail',response);
      }
    }
    async frontLogin(loginData){
      const _ = this;
      return  await _.handler({
            method: 'frontLogin',
            data: loginData
      },'JSON');
    }

  async frontCheckLogin(loginData) {
    const _ = this;
    return await _.handler({
          method: 'frontCheckLogin',
          data: {
            'login': loginData['login']
          }
        }
        , 'JSON');
  }
} 