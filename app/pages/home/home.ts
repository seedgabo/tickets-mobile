import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {CategoriaPage} from '../categoria/categoria';
import {AgregarTicketPage} from '../agregar-ticket/agregar-ticket';
import {LoginPage} from '../login/login';
import {PopoverPage} from '../popover/popover';
@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    api:Api;
    categorias:any;
    constructor(private navCtrl: NavController, api:Api, private modal:ModalController) {
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

    agregarTicket(){
        let modal =this.modal.create(AgregarTicketPage);
        modal.present();
    }

}
