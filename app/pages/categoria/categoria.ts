import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {TicketPage} from '../ticket/ticket';
@Component({
  templateUrl: 'build/pages/categoria/categoria.html',
})
export class CategoriaPage {
    api:Api
    categoria:any;
    tickets:any;
    categorias:any;
  constructor(private navCtrl: NavController, params:NavParams, api:Api) {
      this.api = api;
      this.categoria = params.get('categoria');
      this.api.getTickets(this.categoria.id).then((data:any)=>{
          this.tickets = data.tickets;
          this.categorias = data.categorias;
      });
  }

  navigate(ticket){
      this.navCtrl.push(TicketPage,{ticket: ticket});
  }
  navigateToCat(cat)
  {
      this.navCtrl.push(CategoriaPage,{categoria: cat});
      console.log("abrir Categoria: " + cat.nombre);
  }

}
