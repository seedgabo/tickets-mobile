import { Component } from '@angular/core';
import { NavController,ViewController,NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';

@Component({
  templateUrl: 'build/pages/agregar-comentario/agregar-comentario.html',
})
export class AgregarComentarioPage {
    ticket:any;
    texto:string ="";
    api:Api;
  constructor(private navCtrl: NavController, api:Api,private viewctrl:ViewController,params:NavParams) {
      this.ticket = params.get("ticket");
      this.api = api;
  }

  dismiss()
  {
      this.viewctrl.dismiss({agregado: false});
  }

  agregarComentario()
  {
       let data = "texto="+ this.texto;
      this.api.postComentarioTicket(data,this.ticket.id).then((data)=>{
          this.viewctrl.dismiss({agregado: true});
      });
  }

}
