import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../auth/auth.gaurd';
import { AdminAuthGaurd } from './admin.auth.gaurd';
import { CategoryTagComponent } from './category-tag/category-tag.component';
import { CategoryTagNavComponent } from './category-tag-nav/category-tag-nav.component';
import { BlogComponent } from './blog/blog.component';
import { BloglistComponent } from './bloglist/bloglist.component';


const route:Routes=[
    {
        path:'admin',component:AdminComponent,canActivate:[AuthGuard,AdminAuthGaurd],
        children:[
            {path:'',component:CategoryTagNavComponent},
            {path:'category-tag',component:CategoryTagComponent},
            {path:'blog',component:BlogComponent}
        ]
    },
    {
        path:'blogs',component:BloglistComponent
    }
    
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
export class AdminRoutingModule{


}