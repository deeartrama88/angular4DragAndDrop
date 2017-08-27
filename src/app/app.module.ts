import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageUploadModule} from 'angular2-image-upload';

import {LoginService} from './services/login.service';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './home/table/table.component';
import { BlocksComponent } from './home/blocks/blocks.component';
import { UploaderComponent } from './home/uploader/uploader.component';

const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        TableComponent,
        BlocksComponent,
        UploaderComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        ImageUploadModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        Title,
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
