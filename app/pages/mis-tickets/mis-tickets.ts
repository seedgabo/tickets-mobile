import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api} from '../../providers/api/api';
import {TicketPage} from '../ticket/ticket';

@Component({
  templateUrl: 'build/pages/mis-tickets/mis-tickets.html',
})
export class MisTicketsPage {

    api:Api;
    ticketsCreados:any;
    ticketsResponsables:any;
  constructor(private navCtrl: NavController, api:Api) {
      this.api = api;
      this.getMisTickets();
  }
  getMisTickets(){
      this.api.getMisTickets().then((data:any)=>{
          this.ticketsCreados = data.ticketsCreados;
          this.ticketsResponsables = data.ticketsResponsables;
      });
  }

  navigate(ticket){
      this.navCtrl.push(TicketPage,{ticket: ticket});
  }
}
