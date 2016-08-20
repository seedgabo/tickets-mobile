import { Component } from '@angular/core';
import { NavController,NavParams,ModalController,ToastController,AlertController } from 'ionic-angular';
import {Transfer} from 'ionic-native';
import {Api} from '../../providers/api/api';
import {AgregarComentarioPage} from '../agregar-comentario/agregar-comentario';
declare var cordova:any;
@Component({
    templateUrl: 'build/pages/ticket/ticket.html',
})
export class TicketPage {
    api:Api;
    ticket:any;
    comentarios:any;
    loading:string="";
    constructor(private navCtrl: NavController, params:NavParams, api:Api, private modal:ModalController, private toast:ToastController,private alert:AlertController)
    {
        this.api = api;
        this.ticket = params.get("ticket");
        console.log(this.ticket);
        this.getTicket();
    }

    getTicket()
    {
        this.api.getTicket(this.ticket.id).then((data:any)=>{
            this.ticket = data.ticket;
            this.comentarios = data.comentarios;
        })
    }

    agregarComentario()
    {
        let modal = this.modal.create(AgregarComentarioPage,{'ticket':this.ticket});
        modal.present();
        modal.onDidDismiss((data:any)=>{
            if(data.agregado == true)
            this.getTicket();
        });
    }

    eliminarcomentario(comentario)
    {
        this.api.deleteComenarioTicket(comentario.id).then((data) =>{
            this.getTicket();
        });
    }


    // Descargas de ticket

    descargarArchivoTicket()
    {
        let fileTransfer = new Transfer();
        let uri = encodeURI(this.ticket.path) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            cordova.file.externalRootDirectory + this.ticket.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(cordova.file.externalRootDirectory + this.ticket.archivo, this.ticket.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error, duration:1500, position:"bottom"}).present();
                    this.loading = "";
                }
            );
    }

    preguntarClave()
    {
        let alert = this.alert.create({
            title: 'Introduzca La clave:',
            inputs: [
                {
                    name: 'clave',
                    placeholder: 'Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Descargar',
                    handler: data => {
                        this.descargarArchivoEncriptado(data.clave);
                    }
                }
            ]
        });
        alert.present();
    }

    descargarArchivoEncriptado(clave)
    {
        let fileTransfer = new Transfer();
        let uri = encodeURI(this.api.url + "api/getEncryptedFile/ticket/" + this.ticket.id + "/" + clave) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            cordova.file.externalRootDirectory + this.ticket.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(cordova.file.externalRootDirectory + this.ticket.archivo, this.ticket.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error, duration:1500, position:"bottom"}).present();
                    this.loading = "";
                }
            );
    }



    // Descargas de Comentarios

    descargarArchivoComentario(comentario)
    {
        let fileTransfer = new Transfer();
        let uri = encodeURI(comentario.path) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            cordova.file.externalRootDirectory + comentario.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(cordova.file.externalRootDirectory + comentario.archivo, comentario.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error, duration:1500, position:"bottom"}).present();
                    this.loading = "";
                }
            );
    }

    preguntarClaveComentario(comentario)
    {
        let alert = this.alert.create({
            title: 'Introduzca La clave:',
            inputs: [
                {
                    name: 'clave',
                    placeholder: 'Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Descargar',
                    handler: data => {
                        this.descargarArchivoComentarioEncriptado(comentario,data.clave);
                    }
                }
            ]
        });
        alert.present();
    }

    descargarArchivoComentarioEncriptado(comentario,clave)
    {
        let fileTransfer = new Transfer();
        let uri = encodeURI(this.api.url + "api/getEncryptedFile/comentario/" + comentario.id + "/" + clave) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            cordova.file.externalRootDirectory + comentario.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(cordova.file.externalRootDirectory + comentario.archivo, comentario.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error, duration:1500, position:"bottom"}).present();
                    this.loading = "";
                }
            );
    }




    abrirDocClasico(path,mime)
    {
        console.log(path);
        this.loading = "Abriendo Archivo";
        let opener:string= this.getFileOpener(mime);

        cordova.plugins.fileOpener2.open(
            path,
            opener,
            {
                error : (e)=> {
                    this.toast.create({message:e, duration:1500, position:"bottom"}).present();
                    this.loading = "";
                },
                success :  () => {
                    this.toast.create({message:"Abriendo Archivo", duration:1500, position:"bottom"}).present();
                    this.loading = "";
                }
            }
        );
    }

    getFileOpener(mime)
    {
        if (mime == "pdf")
        return 'application/pdf';

        if (mime == "xls")
        return 'application/vnd.ms-excel';

        if(mime == "xlsx")
        return 'application/vnd.ms-excel';

        if (mime == "doc" || mime == 'docx')
        return 'application/msword';

        if (mime == "txt")
        return 'text/plain';

        if (mime == 'ppt' || mime == 'pptx')
        return 'application/vnd.ms-powerpoint';

        if (mime == 'png')
        return 'image/png';

        if (mime == 'jpg' || mime == 'jpeg')
        return 'image/jpg';

    }

}
