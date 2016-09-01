import {Component} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {LoginPage} from '../login/login';
import {MisTicketsPage} from '../mis-tickets/mis-tickets';
import {TicketsTodosPage} from '../tickets-todos/tickets-todos';
import {BuscadorPage} from '../buscador/buscador';
@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

    private tab1Root: any;
    private tab2Root: any;
    private tab3Root: any;

    constructor(private navCtrl: NavController) {
        this.tab1Root = HomePage;
        this.tab2Root = AboutPage;
        this.tab3Root = ContactPage;
    }

    toLogin(){
        let root:NavController = this.navCtrl;
        root.setRoot(LoginPage);
    }
    MisTickets(){
        this.navCtrl.push(MisTicketsPage);
    }

    TicketTodos(){
        this.navCtrl.push(TicketsTodosPage);
    }
    openBuscador(){
        this.navCtrl.push(BuscadorPage);
    }
}
