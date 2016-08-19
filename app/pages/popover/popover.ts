import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/popover/popover.html',
})
export class PopoverPage {
  constructor(private viewCtrl: ViewController) {}

  close(action) {
    this.viewCtrl.dismiss({action: action});
  }
}
