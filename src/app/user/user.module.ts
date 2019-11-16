import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserRoutingModule } from './user.routing.module';
import { UserComponent } from './user.component';

@NgModule({
    declarations:[
        UserComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpClientModule,
        UserRoutingModule
        
    ],
    providers:[
       
    ],
    exports:[]
})
export class UserModule{

}