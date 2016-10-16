import { Component } from '@angular/core';
import { NavController, AlertController,LoadingController } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {TabsPage}  from '../tabs/tabs';
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    api:Api;
  constructor(private navController: NavController, api:Api,private alert :AlertController, private loading:LoadingController) {
      this.api = api;

  }

  doLogin(){
      let loader = this.loading.create({
          content: "Iniciando Sesión...",
          duration: 3000
      });
      loader.present();
      this.api.doLogin().then((data:any) =>
      {
          if(data.nombre)
          {
              this.api.saveUser(data);
              this.api.saveData();
              this.api.pushRegister();
              loader.dismiss().then(()=>{
                  this.navController.setRoot(TabsPage);
              });
          }
          else
          {
              loader.dismiss().then(()=>{
                  this.alert.create({title:"Error",message:"Usuario y Contraseña Invalidos", buttons:["ok"]}).present();
              });
          }
      });
  }
}
