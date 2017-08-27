import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
    selector: 'app-blocks',
    templateUrl: './blocks.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BlocksComponent implements OnInit {

    userImages = [];
    user: any;

    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('loggedUser'));
        this.userImages = this.user.images;

        this.loginService.loggedUser.subscribe(
            (user: any) => {
                this.userImages = user.images;
                this.user = user;
            }
        );
    }

    deleteUserImage(index: any) {
        this.userImages.splice(index, 1);
        this.user.images = this.userImages;
        this.loginService.updateUser(this.user);
    }

}
