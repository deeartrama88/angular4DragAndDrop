import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    signUpForm: FormGroup;
    error: any;

    constructor(
        private titleService: Title,
        private loginService: LoginService) {
    }

    ngOnInit() {
        // set angular form with validation
        this.signUpForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required])
        });
        this.titleService.setTitle('DragAndDrop login');
    }

    onSubmit() {
        // trying to log in user
        this.error = this.loginService.loginUser(this.signUpForm.value);
    }

}
