import {Injectable} from '@angular/core';
import {Storage, SqlStorage, Platform} from 'ionic-angular';
import {Push, Transfer} from 'ionic-native';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {

    storage = new Storage(SqlStorage);
    username:string;
    password:string;
    token:string;
    url:string = 'http://seguimiento.duflosa.com:8080/' ;
    user:any={};
    pushData:any;
    constructor(public http: Http, private platform:Platform) {
        this.initVar();
    }

    initVar(){
        this.storage.get("user").then( (data)      =>  data!=undefined ? this.user = JSON.parse(data): [] );
        this.storage.get("username").then( (data)      => this.username = data );
        this.storage.get("password").then( (data)      => this.password = data );
    }


    saveData () {
        this.storage.set("username", this.username);
        this.storage.set("password", this.password);
        this.storage.set("url", this.url);
    };

    saveUser(user){
        this.storage.set("user",JSON.stringify(user));
    }

    urlAuth(uri){
        return 'http://seguimiento.duflosa.com:8080/' + uri;
    }


    doLogin(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/login", {headers : this.setHeaders()})
            .map(res => res.json() )
            .subscribe(data => {
                resolve(data);
            }, error => {
                return resolve(this.handleData(error));
            });
        });
    }

    getCategorias(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getCategorias", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error));
            });
        });
    }

    getUsuarios(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getUsuarios", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error));
            });
        });
    }

    getAllCategorias(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getAllCategorias", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getTickets(categoria_id){
        return new Promise(resolve => {
            this.http.get(this.url + "api/"+categoria_id+"/getTickets", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getCategoriasDocumentos(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/documentos/getCategorias", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getUsuariosCategoria(categoria_id){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getUsuariosCategoria/"+categoria_id, {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getDocumentos(categoria){
        return new Promise(resolve => {
            this.http.get(this.url + "api/"+ categoria +"/getDocumentos", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getTicket(ticket_id){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getTicket/"+ ticket_id, {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getMisTickets(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getMisTickets", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getAllTickets(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getAllTickets", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getTicketsAbiertos(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getTicketsAbiertos", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getTicketsVencidos(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getTicketsVencidos", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getSearch(query){
        return new Promise(resolve => {
            this.http.get(this.url + "api/search?query="+ query, {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getNotificaciones(){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getNotificaciones", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    leerNotificacion(id)
    {
        return new Promise(resolve => {
            this.http.get(this.url + "api/notificacion/"+ id + "/leida", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }


    desleerNotificacion(id)
    {
        return new Promise(resolve => {
            this.http.get(this.url + "api/notificacion/"+ id + "/noleida", {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }
    getPacientes(query= ""){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getPacientes" + query, {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getCaso(caso_id){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getCaso/" +caso_id, {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    getIncapacidad(incapacidad_id){
        return new Promise(resolve => {
            this.http.get(this.url + "api/getIncapacidad/" +incapacidad_id, {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    iniciarSeguimiento(caso_id){
        return new Promise(resolve => {
            this.http.get(this.url + "api/iniciar-seguimiento/" + caso_id, {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    postTicket(data){
        return new Promise(resolve => {
            this.http.post(this.url + "api/addTicket", data ,{headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    postComentarioTicket(data,ticket_id){
        return new Promise(resolve => {
            this.http.post(this.url + "api/addComentario/"+ticket_id, data ,{headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    postAlerta(data){
        return new Promise(resolve => {
            this.http.post(this.url + "api/addAlerta", data ,{headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }

    putTicket(data, id){
        return new Promise(resolve => {
            this.http.put(this.url + "api/editTicket/" + id, data ,{headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }



    deleteComenarioTicket(comentario_id){
        return new Promise(resolve => {
            this.http.delete(this.url + "api/deleteComenarioTicket/"+ comentario_id, {headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }


    postPushtoken(data){
          return new Promise(resolve => {
              this.http.post(this.url + "api/dispositivos", data ,{headers : this.setHeaders()})
              .map(res => res.json())
              .subscribe(data => {
                  resolve(data);
              }, error => {return resolve(this.handleData(error))});
          });
      }

    pushRegister(){
        let push:any = Push.init({
            android: {
                senderID: "600000041642",
                clearNotifications: 'false',
            },
            ios: {
                alert: "true",
                badge: true,
                sound: 'true'
            },
            windows: {}
        });

        if (typeof push.error === 'undefined' || push.error === null){
            let body;
            push.on('registration', (data) => {
                console.log(data.registrationId);
                if(this.platform.is('android'))
                     body = "token=" + data.registrationId + "&plataforma=android";
                else
                    body = "token=" + data.registrationId + "&plataforma=ios";

                this.postPushtoken(body).then(Response =>{
                    this.pushData = Response;
                    this.savePushData(Response);
                });
            });

            push.on('notification', (data) => {
                console.log(data.message);
                console.log(data.title);
                console.log(data.count);
                console.log(data.sound);
                console.log(data.image);
                console.log(data.additionalData);
            });

            push.on('error', (e) => {
                console.log(e.message);
            });
            return true;
        }
        return false;
    }

    savePushData(pushData){
        this.storage.setJson('pushData', pushData);
    }

    putPushData(id, data){
        return new Promise(resolve => {
            this.http.put(this.url + "api/dispositivos/" + id, data ,{headers : this.setHeaders()})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, error => {return resolve(this.handleData(error))});
        });
    }


    postArchivoTicket(data, fileurl, nombre){
        const fileTransfer = new Transfer();
        var options = {
           fileKey: 'archivo',
           fileName: decodeURIComponent(nombre),
           headers: { "Authorization" : "Basic " + btoa(this.username + ":" + this.password) },
           params: data
        }
        return fileTransfer.upload(fileurl, this.url + "api/addTicket", options, true)
    }

    postArchivoComentarioTicket(ticket_id,data, fileurl,nombre){
        const fileTransfer = new Transfer();
        var options = {
           fileKey: 'archivo',
           fileName: decodeURIComponent(nombre),
           headers: { "Authorization" : "Basic " + btoa(this.username + ":" + this.password) },
           params: data
        }
        return fileTransfer.upload(fileurl, this.url + "api/addComentario/"+ticket_id, options, true)
    }

    private setHeaders(){
        let headers = new Headers();
        if (this.token != undefined && this.token != 'undefined'  &&  this.token.length != 0)
        headers.append("Auth-Token", this.token);
        else
        headers.append("Authorization","Basic " + btoa(this.username + ":" + this.password));

        headers.append('Content-Type' , 'application/x-www-form-urlencoded');
        return headers;
    }

    private handleData(res){
        if(res.statusText == "Ok"){
            return {status: "No Parace haber conexión con el servidor"};
        }

        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
            return {error: res.status}
        }
        // If everything went fine, return the response
        else {
            return res;
        }
    }
}
