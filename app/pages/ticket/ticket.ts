import { Component } from '@angular/core';
import {Platform, NavController,NavParams,ModalController,ToastController,AlertController } from 'ionic-angular';
import {Transfer, InAppBrowser} from 'ionic-native';
import {Api} from '../../providers/api/api';
import {AgregarComentarioPage} from '../agregar-comentario/agregar-comentario';
import {EditTicketPage} from '../edit-ticket/edit-ticket';
declare var cordova:any;
declare var window:any;
declare var moment:any;
@Component({
    templateUrl: 'build/pages/ticket/ticket.html',
})
export class TicketPage {
    api:Api;
    ticket:any;
    comentarios:any;
    loading:string="";
    constructor(private platform:Platform, private navCtrl: NavController, params:NavParams, api:Api, private modal:ModalController, private toast:ToastController,private alert:AlertController)
    {
        this.api = api;
        this.ticket = params.get("ticket");
        console.log(this.ticket);
        this.getTicket();
    }

    getTicket(){
        this.api.getTicket(this.ticket.id).then((data:any)=>{
            this.ticket = data.ticket;
            console.log(this.ticket);
            this.comentarios = data.comentarios;
        })
    }

    doRefresh(refresher){
        this.api.getTicket(this.ticket.id).then((data:any)=>{
            this.ticket = data.ticket;
            this.comentarios = data.comentarios;
            refresher.complete();
        })
    }

    agregarComentario(){
        let modal = this.modal.create(AgregarComentarioPage,{'ticket':this.ticket});
        modal.present();
        modal.onDidDismiss((data:any)=>{
            if(data.agregado == true)
            this.getTicket();
        });
    }

    eliminarcomentario(comentario){
        this.api.deleteComenarioTicket(comentario.id).then((data) =>{
            this.getTicket();
        });
    }

    editTicket(){
        let modal = this.modal.create(EditTicketPage,{ticket: this.ticket});
        modal.present();
        modal.onDidDismiss((data:any)=>{
            this.getTicket();
        });
    }
    // Descargas de ticket

    descargarArchivoTicketold(){
        let dir;
        if (this.platform.is('android'))
            dir = cordova.file.externalApplicationStorageDirectory;
        else
            dir = cordova.file.documentsDirectory;
        let fileTransfer = new Transfer();
        let uri = encodeURI(this.ticket.path) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            dir + this.ticket.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(dir + this.ticket.archivo, this.ticket.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error.message, duration:6000, position:"bottom"}).present();
                    this.loading = "";
                }
            );
    }

    descargarArchivoTicket(){
        let url = encodeURI(this.ticket.path) ;
        let browser = InAppBrowser.open(url,"_system");
    }

    preguntarClave(){
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

    descargarArchivoEncriptadoold(clave){
        let dir;
        if (this.platform.is('android'))
            dir = cordova.file.externalApplicationStorageDirectory;
        else
            dir = cordova.file.documentsDirectory;
        let fileTransfer = new Transfer();
        let uri = encodeURI(this.api.url + "api/getEncryptedFile/ticket/" + this.ticket.id + "/" + clave) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            dir + this.ticket.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:5000, position:"bottom"}).present();
                    this.abrirDocClasico(dir + this.ticket.archivo, this.ticket.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error.message, duration:6000, position:"bottom"}).present();
                    this.loading = "";
                }
            );
    }

    descargarArchivoEncriptado(clave){
        let url = encodeURI(this.api.urlAuth("api/getEncryptedFile/ticket/" + this.ticket.id + "/" + clave)) ;
        let browser = InAppBrowser.open(url,"_system");
    }


    // Descargas de Comentarios

    descargarArchivoComentarioold(comentario){
        let dir;
        if (this.platform.is('android'))
            dir = cordova.file.externalApplicationStorageDirectory;
        else
            dir = cordova.file.documentsDirectory;
        let fileTransfer = new Transfer();
        let uri = encodeURI(comentario.path) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            dir + comentario.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(dir + comentario.archivo, comentario.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error.message, duration:6000, position:"bottom"}).present();
                    this.loading = "";
                }
            );
    }


    descargarArchivoComentario(comentario){
        let url = encodeURI(comentario.path);
        let browser = InAppBrowser.open(url, '_system','hidden=yes');
    }

    preguntarClaveComentario(comentario){
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

    descargarArchivoComentarioEncriptado(comentario,clave){
        let url = encodeURI(this.api.urlAuth("api/getEncryptedFile/comentario/" + comentario.id + "/" + clave)) ;
        let browser = InAppBrowser.open(url, '_system','hidden=yes');
    }

    descargarArchivoComentarioEncriptadoold(comentario,clave){
        let dir;
        if (this.platform.is('android'))
            dir = cordova.file.externalApplicationStorageDirectory;
        else
            dir = cordova.file.documentsDirectory;
        let fileTransfer = new Transfer();
        let uri = encodeURI(this.api.url + "api/getEncryptedFile/comentario/" + comentario.id + "/" + clave) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            dir + comentario.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(dir + comentario.archivo, comentario.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error.message, duration:6000, position:"bottom"}).present();
                    this.loading = "";
                }
            );
    }


    fechar(fecha)
    {
        return moment(fecha).format("dddd,D MMMM  YYYY, h:mm:ss a");
    }


    abrirDocClasico(path,mime){
        console.log(path);
        this.loading = "Abriendo Archivo";
        let opener:string= this.getFileOpener(mime);

        cordova.plugins.fileOpener2.open(
            path,
            opener,
            {
                error : (e)=> {
                    if(e.status == 9)
                        this.alert.create({title:"Error", message:"Debe Descargar una aplicación para abrir este archivo", buttons:["ok"]}).present();
                    else
                        this.alert.create({title:"Error", message:'Error status: ' + e.status + ' - Error message: ' + e.message, buttons:["ok"]}).present();
                    this.loading = "";
                },
                success :  () => {
                    this.toast.create({message:"Abriendo Archivo", duration:1500, position:"bottom"}).present();
                    this.loading = "";
                }
            }
        );
    }

    getFileOpener(mime){
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
