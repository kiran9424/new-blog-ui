import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminAuthGaurd } from './admin.auth.gaurd';
import { CategoryTagComponent } from './category-tag/category-tag.component';
import { CategoryTagNavComponent } from './category-tag-nav/category-tag-nav.component';
import { AdminService } from './admin.service';
import { BlogComponent } from './blog/blog.component';
import { QuillModule } from 'ngx-quill';
import { BloglistComponent } from './bloglist/bloglist.component'
import { UniquePipe } from './unique';




@NgModule({
    declarations: [
        AdminComponent,
        CategoryTagComponent,
        CategoryTagNavComponent,
        BlogComponent,
        BloglistComponent,
        UniquePipe
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        HttpClientModule,
        AdminRoutingModule,
        QuillModule.forRoot(),
        ReactiveFormsModule


    ],
    providers: [
        AdminAuthGaurd,
        AdminService
    ],
    exports: []
})
export class AdminModule {

}