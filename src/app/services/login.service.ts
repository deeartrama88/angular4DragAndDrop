import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoginService implements OnInit {
    loggedUser = new Subject();
    thisLoggedUser: any;
    allUsers = [];

    constructor(
        private http: Http,
        private router: Router
    ) {}

    ngOnInit() {
    }

    getAllUsers() {
        /*
            set all user from file to local storage if
            if data is not there already
         */
        let allUsers = [];
        if (localStorage.getItem('allUsers') === null) {
            this.http.get('assets/users.json')
                .map((res: Response) => (
                    res.json()
                ))
                .subscribe(data => {
                    allUsers = data['Users'];
                    this.allUsers = data['Users'];
                    localStorage.setItem('allUsers', JSON.stringify(data['Users']));
                });
        } else {
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
            this.allUsers = JSON.parse(localStorage.getItem('allUsers'));
        }
        return allUsers;
    }

    loginUser(credentials) {
        /* check passed credentials */
        const loggedUser = this.allUsers.filter(user => {
            return user.email === credentials.email && user.password === credentials.password;
        });
        if (loggedUser.length > 0) {
            loggedUser[0].images = [];
            /* set our user to localStorage and rout to home component */
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser[0]));
            /* route to home page */
            this.router.navigate(['/home']);
            /* update user for all components */
            this.loggedUser.next(loggedUser[0]);
            /* save logged user in variable to get after reload */
            this.thisLoggedUser = loggedUser[0];
            return false;
        }else {
            return true;
        }
    }

    updateUser(user: any) {
        // here we save our updated user to local storage and update all other components
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.loggedUser.next(user);
    }

}
