import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth.gaurd';

const route:Routes=[
    {path:'signup',component:SignupComponent,canActivate:[AuthGuard]},
    {path:'signin',component:SigninComponent,canActivate:[AuthGuard]}
]

@NgModule({
    imports:[
        RouterModule.forRoot(route)
    ],
    declarations:[],
    exports:[
        RouterModule
    ]
})
export class AuthRoutingModule{


}