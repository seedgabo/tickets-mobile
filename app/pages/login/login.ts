import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {TabsPage}  from '../tabs/tabs';
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    api:Api;
  constructor(private navController: NavController, api:Api,private alert :AlertController) {
      this.api = api;

  }

  doLogin(){
      this.api.doLogin().then((data:any) =>
      {
          if(data.nombre)
          {
              this.api.saveUser(data);
              this.api.saveData();
              this.api.pushRegister();
              this.navController.setRoot(TabsPage);
          }
          else
          {
                this.alert.create({title:"Error",message:"Usuario y Contraseña Invalidos", buttons:["ok"]}).present();
          }
            // this.navController.setRoot(HomePage);
      });
  }
}
