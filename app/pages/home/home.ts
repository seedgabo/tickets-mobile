import {Component} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {CategoriaPage} from '../categoria/categoria';
import {LoginPage} from '../login/login';
import {PopoverPage} from '../popover/popover';
@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    api:Api;
    categorias:any;
    constructor(private navCtrl: NavController, api:Api, private popoverCtrl:PopoverController) {
        this.api = api;
        this.getCategorias();
    }

    getCategorias(){
        this.api.getCategorias().then((data:any) =>{
            console.log(data);
            this.categorias = data;
        })
    }

    navigate(cat){
        this.navCtrl.push(CategoriaPage,{categoria: cat});
        console.log("abrir Categoria: " + cat.nombre);
    }

    toLogin(){
        let root:NavController = this.navCtrl.parent.parent;
        console.log(root);
        root.setRoot(LoginPage);
    }

    presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.onDidDismiss((data) => {
            if(data.action == 'logout')
            {
                this.toLogin();
            }
            if(data.action == 'refresh')
            {
                this.getCategorias();
            }
          });
        popover.present({ev: ev});
    }
}