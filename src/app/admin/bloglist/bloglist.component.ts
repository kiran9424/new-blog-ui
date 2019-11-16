import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import * as moment from 'moment';
@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit {
  moment: any = moment;
  constructor(public adminService:AdminService) { }

  blogList:any; 
  blogPic:any;
  temp:any;
  ngOnInit() {
    
    
    this.getAllBlogsCategoriesTagsList();
    setTimeout(()=>{
      

    },1000)
  }

  

  getBlogPic(slug){
    // this.adminService.getBlogsPic(slug).subscribe(
    //         (data)=>{
    //           this.blogPic = data;
    //         },(err)=>{
  
    //         })
    // const blogs = this.blogList;
    //   this.blogList.forEach((el)=>{
    //     let slug = el.slug;
    //     this.adminService.getBlogsPic(slug).subscribe(
    //       (data)=>{
    //         this.blogPic = data;
    //       },(err)=>{

    //       })
    //   })
  }
  getAllBlogsCategoriesTagsList(){
    this.adminService.getAllBlogsCategoriesTagsList().subscribe(
      (data)=>{
        this.blogList = data.blogs
         this.temp = this.blogList.map(unique=>unique.categories).filter((value,index,self)=>{
          value .indexOf(value.categoryName)  === index;
          console.log(this.temp);
          
        })
      },(error)=>{

      })
  }

  getBlogsTags(){
    this.blogList.forEach((el)=>{
      
    })
  }

}
