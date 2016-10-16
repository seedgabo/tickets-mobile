import {Component} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {LoginPage} from '../login/login';
import {MisTicketsPage} from '../mis-tickets/mis-tickets';
import {TicketsTodosPage} from '../tickets-todos/tickets-todos';
import {BuscadorPage} from '../buscador/buscador';
import {NotificacionesPage} from '../notificaciones/notificaciones';
import {Api} from '../../providers/api/api';
@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

    private tab1Root: any;
    private tab2Root: any;
    private tab3Root: any;
    medico = false;
    constructor(private navCtrl: NavController, private api:Api) {
        this.tab1Root = HomePage;
        this.tab2Root = AboutPage;
        this.tab3Root = ContactPage;
        if(this.api.user)
        {
            this.medico = this.api.user.medico == 1;
        }
    }

    toLogin(){
        let root:NavController = this.navCtrl;
        root.setRoot(LoginPage);
    }

    toNotificaciones()
    {
        this.navCtrl.push(NotificacionesPage);
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
