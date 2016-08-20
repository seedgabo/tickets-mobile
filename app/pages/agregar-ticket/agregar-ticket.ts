import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import {Api} from '../../providers/api/api';

@Component({
    templateUrl: 'build/pages/agregar-ticket/agregar-ticket.html',
})
export class AgregarTicketPage {

    api:Api;
    categoria:any;
    usuarios:any;
    titulo:string="";
    contenido:string="";
    guardian_id:string="";
    transferible:boolean=true;
    vencimiento:string = new Date(new Date().getTime() + 60 * 60 * 24 * 1000).toISOString();;
    constructor(private navCtrl: NavController, private viewctrl:ViewController, api:Api,params:NavParams) {
        this.categoria = params.get('categoria');
        this.api = api;
        this.getUsuarios();
    }

    getUsuarios(){
        this.api.getUsuariosCategoria(this.categoria.id).then((data:any)=>{
            this.usuarios = data;
        });
    }

    dismiss(){
        this.viewctrl.dismiss({agregado: false});
    }

    agregarTicket(){
        let data = `titulo=${this.titulo}&contenido=${this.contenido}&categoria_id=${this.categoria.id}&guardian_id=${this.guardian_id}&vencimiento=${this.vencimiento}&transferible=${this.transferible}`;
        this.api.postTicket(data).then((data)=>{
            this.viewctrl.dismiss({agregado: true});
        });
    }

    rellenado(){
        return  !(this.titulo.length >3 && this.contenido.length >3 && this.guardian_id != "" && this.vencimiento.length != undefined);
    }
}
