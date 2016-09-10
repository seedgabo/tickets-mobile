import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {CasoPage} from '../caso/caso';
@Component({
  templateUrl: 'build/pages/paciente/paciente.html',
})
export class PacientePage {
    paciente:any;
  constructor(private navCtrl: NavController, private api:Api, public params:NavParams) {
      this.paciente = params.get("paciente");
  }

  verCaso(caso)
  {
      this.navCtrl.push(CasoPage,{caso:caso});
  }

}
