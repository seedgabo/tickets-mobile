import { Component } from '@angular/core';
import { NavController,ViewController,NavParams, LoadingController, AlertController} from 'ionic-angular';
import {Api} from '../../providers/api/api';
declare var fileChooser:any;
@Component({
    templateUrl: 'build/pages/agregar-comentario/agregar-comentario.html',
})
export class AgregarComentarioPage {
    ticket:any;
    texto:string ="";
    archivo:string = null;
    clave:string = "";
    nombre:string="";
    api:Api;

    constructor(private navCtrl: NavController, api:Api,private viewctrl:ViewController,params:NavParams, private loading:LoadingController, private alert:AlertController) {
        this.ticket = params.get("ticket");
        this.api = api;
    }

    dismiss()
    {
        this.viewctrl.dismiss({agregado: false});
    }

    agregarComentario()
    {
        if(this.archivo == null)
        {
            let data = "texto="+ this.texto;
            this.api.postComentarioTicket(data,this.ticket.id).then((data)=>{
                this.viewctrl.dismiss({agregado: true});
            });
        }
        else
        {
            let loading = this.loading.create({content: "cargando"});
            loading.present();
            let data:any = {};
            data.texto = this.texto;
            if(this.clave.length > 0 )
            {
                data.clave = this.clave;
                data.encriptado = "true";
            }
            this.api.postArchivoComentarioTicket(this.ticket.id,data, this.archivo, this.nombre).then((data) => {
                console.log(data);
                loading.dismiss().then(()=>{
                    this.viewctrl.dismiss({agregado: true});
                });
            }).catch((err) =>{
                loading.dismiss().then(()=>{
                    this.alert.create({title:"Error", message: "Ocurrió un error al subir el archivo, si esto persiste por favor contacte al desarrollador",buttons: ["ok"]}).present();
                    console.log(err);
                });
            });
        }
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
