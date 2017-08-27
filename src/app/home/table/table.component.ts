import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
    loggedUser: any;
    popUp = false;
    imagesArray = [];
    popUpImageSrc = '';

    headers = [
        'ID', 'Image Name', 'Uploaded User', 'Checksum', 'Events'
    ];

    constructor(private loginService: LoginService) {}

    ngOnInit() {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

        this.imagesArray = this.loggedUser.images;

        this.loginService.loggedUser.subscribe(
            (loggedUser) => {
                this.loggedUser = loggedUser;
                this.imagesArray = this.loggedUser.images;
            }
        );
    }
    // generate array of values from object value
    generateArray(obj) {
        const array = Object.keys(obj).map((key) => {
            return obj[key];
        });
        // remove 2 last properties, we don't need to display them
        array.pop();
        array.pop();
        return array;
    }

    deleteImage(image: any) {
        const index = this.imagesArray.findIndex(function(o){
            return o.id === image.id;
        });
        if (index !== -1) {
            this.imagesArray.splice(index, 1);
            this.loggedUser.images = this.imagesArray;
            this.loginService.updateUser(this.loggedUser);
        }
        if (this.popUp) {
            this.closePopUp();
        }
    }

    viewImage(image: any) {
        const index = this.imagesArray.findIndex(function(o){
            return o.id === image.id;
        });
        if (index !== -1) {
            this.popUpImageSrc = this.imagesArray[index].imageUrl;
            this.popUp = true;
        }
    }

    closePopUp() {
        this.popUp = false;
        this.popUpImageSrc = '';
    }

}
