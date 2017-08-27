import {
    Component,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import { sha256 } from 'js-sha256/src/sha256';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    loggedUser: any;

    constructor(
        private titleService: Title,
        private router: Router) {}

    ngOnInit() {
        /* check if user is logged in when he come to this page, otherwise route to login page */
        if (JSON.parse(localStorage.getItem('loggedUser')) === null) {
            this.router.navigate(['/login']);
        }
        this.titleService.setTitle('DragAndDrop home');
    }

}
