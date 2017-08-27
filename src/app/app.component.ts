import {
    Component,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './services/login.service';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    allUsers: any;

    constructor(private router: Router,
                private loginService: LoginService) {
    }

    ngOnInit() {
        this.allUsers = this.loginService.getAllUsers();
        /*
            check if we have active user, if yes - go to home component
            else go to login page
        */
        if (JSON.parse(localStorage.getItem('loggedUser')) === null) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/home']);
        }
    }

}
