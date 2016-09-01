import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api} from '../../providers/api/api';
import {TicketPage} from '../ticket/ticket';

@Component({
  templateUrl: 'build/pages/tickets-todos/tickets-todos.html',
})
export class TicketsTodosPage {

    api:Api;
    tickets:any;
  constructor(private navCtrl: NavController, api:Api) {
      this.api = api;
      this.getMisTickets();
  }
  getMisTickets(){
      this.api.getAllTickets().then((data:any)=>{
          this.tickets = data.tickets;
      });
  }
  navigate(ticket){
      this.navCtrl.push(TicketPage,{ticket: ticket});
  }
}
