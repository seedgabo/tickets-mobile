import {Component} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {DocumentosPage} from '../documentos/documentos';
import {LoginPage} from '../login/login';
import {PopoverPage} from '../popover/popover';
@Component({
    templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
    api:Api
    categorias:any;
    constructor(private navCtrl: NavController, api:Api, private popoverCtrl:PopoverController) {
        this.api  =api;
        this.getCategorias();
    }

    
    getCategorias(){
        this.api.getCategoriasDocumentos().then((data:any) =>{
            this.categorias = data;
        });
    }

    navigate(cat){
          this.navCtrl.push(DocumentosPage, {categoria : cat});
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
