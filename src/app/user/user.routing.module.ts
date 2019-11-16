import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from '../auth/auth.gaurd';




const route:Routes=[
    {path:'user',component:UserComponent,canActivate:[AuthGuard]},
    
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
export class UserRoutingModule{


}