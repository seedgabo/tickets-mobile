import { Component } from '@angular/core';
import {Platform, NavController,NavParams, ToastController,AlertController } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {Transfer,InAppBrowser} from 'ionic-native';
declare var cordova:any;
declare var window:any;
@Component({
    templateUrl: 'build/pages/documentos/documentos.html',
})
export class DocumentosPage {
    api:Api;
    categoria:any;
    documentos:any;
    categorias:any;
    loading:string = "";
    constructor(private platform:Platform,private navCtrl: NavController, params:NavParams, api:Api,private toast:ToastController, private alert:AlertController) {
        this.api = api;
        this.categoria = params.get('categoria');
        this.getDocumentos();
    }

    getDocumentos(){
        this.api.getDocumentos(this.categoria.id).then((data:any)=>{
            this.documentos = data.documentos;
            this.categorias = data.categorias;
        });
    }

    doRefresh(refresher){
        this.api.getDocumentos(this.categoria.id).then((data:any)=>{
            this.documentos = data.documentos;
            this.categorias = data.categorias;
            refresher.complete();
        });
    }

    navigateToCat(categoria){
        this.navCtrl.push(DocumentosPage, {categoria: categoria});
    }

    descargarDocumento(documento){
        let url =encodeURI(this.api.urlAuth("api/getDocumento/" + documento.id));
        let browser = InAppBrowser.open(url,"_system");
    }

    descargarDocumentoprev(documento){
        let dir;
        if (this.platform.is('android'))
            dir = cordova.file.externalApplicationStorageDirectory;
        else
            dir = cordova.file.documentsDirectory;
        let fileTransfer = new Transfer();
        let uri = encodeURI(this.api.url + "api/getDocumento/" + documento.id) ;
        let headers ={};
        headers = { 'Authorization' :  "Basic " + btoa(this.api.username + ":" + this.api.password)};
        this.loading = "Descargando Archivo";
        fileTransfer.download(
            uri,
            dir + documento.archivo,
            true,
            {
                headers: headers
            }).then(
                (entry)  => {
                    this.toast.create({message:"Archivo Descargado", duration:1500, position:"bottom"}).present();
                    this.abrirDocClasico(dir + documento.archivo, documento.mime);
                }
            ). catch(
                (error) => {
                    this.alert.create({message:JSON.stringify(error), buttons:["ok"], title: "Error"}).present();
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
                        if (e.status == 9)
                        {
                            this.alert.create({title:"Error", message:"No posee una aplicacion para abrir el archivo", buttons:["ok"]}).present();

                        }
                        else
                        {
                            this.alert.create({title:"Error", message:'Error status: ' + e.status + ' - Error message: ' + e.message, buttons:["ok"]}).present();
                        }
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
