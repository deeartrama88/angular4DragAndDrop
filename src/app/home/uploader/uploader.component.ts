import {
    Component,
    ViewEncapsulation,
    OnInit,
    ViewChild
} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {sha256} from 'js-sha256/src/sha256';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UploaderComponent implements OnInit {
    @ViewChild('imageUpload') imageUpload;
    loggedUser;

    imagesFilesArray = [];
    imagesArray = [];

    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.imagesArray = this.loggedUser.images;

        this.loginService.loggedUser.subscribe(
            (user) => {
                this.loggedUser = user;
            }
        );
    }

    dropZoneClick(element, e) {
        if (e.target === document.querySelector('.file-upload')) {
            /* call file input */
            element.inputElement.nativeElement.click();
        }
    }

    onFileDropped(e) {
        this.imagesFilesArray.push(e.file);
    }

    onImageRemoved(e) {
        this.imagesFilesArray = this.imagesFilesArray.filter(img => {
            return img !== e.file;
        });
    }

    encodeImageFileAsURL(file) {
        // create list of images from list of files
        const reader = new FileReader();
        const this_ = this;
        const userEmail = this.loggedUser.email;
        const checkSum = sha256(Math.random().toString());
        reader.onloadend = function () {
            const imageObj = {
                'id': Math.random(),
                'imagesName': file.name,
                'uploadedUser': userEmail,
                'checkSum': checkSum,
                'fileSize': file.size + ' kB',
                'imageUrl': reader.result
            };
            this_.imagesArray.push(imageObj);
        };
        reader.readAsDataURL(file);
    }

    saveToLocalStorage() {
        /* on save button create list of image objects */
        for (const image of this.imagesFilesArray) {
            this.encodeImageFileAsURL(image);
        }
        /* than save it to our user */
        this.loggedUser.images = this.imagesArray;
        /* delete previews */
        this.imageUpload.deleteAll();
        const _this = this;
        setTimeout(function () {
            _this.loginService.updateUser(_this.loggedUser);
        }, 200);
    }

}
