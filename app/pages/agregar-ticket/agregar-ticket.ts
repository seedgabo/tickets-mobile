import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import { Transfer } from 'ionic-native';
declare var fileChooser:any;
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
    vencimiento:string = new Date(new Date().getTime() + 60 * 60 * 24 * 1000).toISOString();
    nombre:string="";
    clave:string="";
    archivo:string = null;
    constructor(private navCtrl: NavController, private viewctrl:ViewController, api:Api,params:NavParams,private loading:LoadingController, private alert:AlertController) {
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
        let loading = this.loading.create({content:"Cargando"});
        loading.present();
        if(this.archivo ==null)
        {
            let data = `titulo=${this.titulo}&contenido=${this.contenido}&categoria_id=${this.categoria.id}&guardian_id=${this.guardian_id}&vencimiento=${this.vencimiento}&transferible=${this.transferible}`;
            this.api.postTicket(data).then((data)=>{
                loading.dismiss().then(()=>{
                    this.viewctrl.dismiss({agregado: true});
                });
            });
        }
        else
        {
            let data:any = {};
            data.titulo = this.titulo;
            data.contenido = this.contenido;
            data.categoria_id = this.categoria.id;
            data.guardian_id = this.guardian_id;
            data.vencimiento = this.vencimiento;
            data.transferible = this.transferible;
            if(this.clave.length > 0 )
            {
                data.clave = this.clave;
                data.encriptado = "true";
            }
            this.api.postArchivoTicket(data, this.archivo, this.nombre).then((data) => {
                console.log(data);
                loading.dismiss().then(()=>{
                    this.viewctrl.dismiss({agregado: true});
                });
            }).catch((err) =>{
                console.log(err)
                loading.dismiss().then(()=>{
                    this.alert.create({title:"Error", message: "Ocurrió un error al subir el archivo, si esto persiste por favor contacte al desarrollador",buttons: ["ok"]}).present();
                });
            });
        }
    }

    rellenado(){
        return  !(this.titulo.length >3 && this.contenido.length >3 && this.guardian_id != "" && this.vencimiento.length != undefined);
    }

    pickFile() {
        fileChooser.open((data)=>{
            this.archivo = data;
            this.alert.create({title:"Nombre del archivo",subTitle: "no olvide colocar la extension.(ej: archivo.pdf)" ,inputs:[
                {
                    type: "url",
                    name: "nombre",
                    placeholder: "Nombre del archivo",
                    value: "." + data.split('.').pop()
                },
            ],
            buttons:[
                {
                    text: 'Cancelar',
                    handler: form => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: (form) => {
                        this.nombre = form.nombre;
                    }
                }
            ]
        }).present();
    },(data)=>{
        console.log(data);
    });
    }
}
