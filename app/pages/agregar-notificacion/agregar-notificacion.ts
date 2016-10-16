import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController,AlertController, Platform } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import { Transfer } from 'ionic-native';
declare var fileChooser:any;
declare var window:any;
@Component({
    templateUrl: 'build/pages/agregar-notificacion/agregar-notificacion.html',
})
export class AgregarNotificacionPage {

    api:Api;
    usuarios:any= [];
    titulo:string="";
    contenido:string="";
    users_id:any =[];
    programado:string = new Date(new Date().getTime() + 60 * 60 * 24 *1000).toISOString();
    inmediato:boolean=false;
    constructor(public navCtrl: NavController, public viewctrl:ViewController, api:Api,public loading:LoadingController, public alert:AlertController, public platform:Platform) {
        this.api = api;
        this.getUsuarios();
    }

    getUsuarios(){
        if (this.api.user.admin == 0) {
            this.usuarios[0] = this.api.user;
            this.users_id[0] = this.api.user.id;
        }
        else
        {
            this.api.getUsuarios().then((data:any)=>{
                this.usuarios = data.usuarios;
                this.users_id[0] = this.api.user.id;
            });
        }
    }

    seleccionarTodos(){
        let seleccionados = [];
        for (var i =0; i < this.usuarios.length; i++)
        {
            seleccionados[i] = this.usuarios[i].id;
        }
        this.users_id = seleccionados;
    }



    dismiss(){
        this.viewctrl.dismiss({agregado: false});
    }

    agregarAlerta(){
        let loading = this.loading.create({content:"Cargando"});
        loading.present();
        let data = `titulo=${this.titulo}&mensaje=${this.contenido}&correo=${this.contenido}&users_id=${this.users_id}&programado=${this.programado}&inmediato=${this.inmediato}`;
        this.api.postAlerta(data).then((data)=>{
            loading.dismiss().then(()=>{
                this.viewctrl.dismiss({agregado: true});
            });
        });
    }

    rellenado(){
        return  !(this.titulo.length >3 && this.contenido.length >3 && this.users_id.length >= 1 && this.programado != "");
    }

}
