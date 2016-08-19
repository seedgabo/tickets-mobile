import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {TabsPage}  from '../tabs/tabs';
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    api:Api;
  constructor(private navController: NavController, api:Api) {
      this.api = api;

  }

  doLogin(){
      this.api.doLogin().then((data:any) =>
      {
          if(data.nombre)
            this.api.saveUser(data);
            this.api.saveData();
            this.navController.setRoot(TabsPage);
            // this.navController.setRoot(HomePage);
      });
  }
}
