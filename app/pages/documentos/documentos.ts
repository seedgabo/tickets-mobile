import { Component } from '@angular/core';
import { NavController,NavParams, ToastController } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {Transfer} from 'ionic-native';
declare var cordova:any;
@Component({
    templateUrl: 'build/pages/documentos/documentos.html',
})
export class DocumentosPage {
    api:Api;
    categoria:any;
    documentos:any;
    categorias:any;
    loading:string = "";
    constructor(private navCtrl: NavController, params:NavParams, api:Api,private toast:ToastController) {
        this.api = api;
        this.categoria = params.get('categoria');
        this.api.getDocumentos(this.categoria.id).then((data:any)=>{
            this.documentos = data.documentos;
            this.categorias = data.categorias;
        });
    }

    navigateToCat(categoria){
        this.navCtrl.push(DocumentosPage, {categoria: categoria});
    }

    descargarDocumento(documento){
        let fileTransfer = new Transfer();
        let uri = encodeURI(this.api.url + "api/getDocumento/" + documento.id) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            cordova.file.externalRootDirectory + documento.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(cordova.file.externalRootDirectory + documento.archivo, documento.mime);
                }
            ). catch(
                (error) => {
                    this.toast.create({message:error, duration:1500, position:"bottom"}).present();
                    this.loading = "";
                }
            )
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
