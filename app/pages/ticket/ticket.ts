import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Api} from '../../providers/api/api';

@Component({
  templateUrl: 'build/pages/ticket/ticket.html',
})
export class TicketPage {
    api:Api;
    ticket:any;
    comentarios:any;
  constructor(private navCtrl: NavController, params:NavParams, api:Api) {
    this.api = api;
    this.ticket = params.get("ticket");
    console.log(this.ticket);
    this.api.getTicket(this.ticket.id).then((data:any)=>{
        this.ticket = data.ticket;
        this.comentarios = data.comentarios;
    })
  }

}
