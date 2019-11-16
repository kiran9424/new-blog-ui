import { Component, OnInit, OnChanges } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-tag',
  templateUrl: './category-tag.component.html',
  styleUrls: ['./category-tag.component.scss']
})
export class CategoryTagComponent implements OnInit {
  categoryData ={}
  categoryList:[] = [];
  tagList:[] =[];
  error:string;
  constructor(private adminService:AdminService,private toastr: ToastrService) { }

  ngOnInit() {
      this.getCategoryList();
      this.getTagList()
  }

  //creating a category
  createCategory(categoryForm){
    this.adminService.createCategory(categoryForm.form.value).subscribe(
      (data)=>{ 
        this.toastr.success(data.categoryName, 'Successfully added');
        this.getCategoryList()
        categoryForm.reset();
      },(err)=>{
        this.error = err.error
      })
  }

  //creating a tags
  createTag(tagForm){
    this.adminService.createTag(tagForm.form.value).subscribe(
      (data)=>{ 
        this.toastr.success(data.tagName, 'Successfully added');
        this.getTagList()
        tagForm.reset();
      },(err)=>{
        this.error = err.error
      })
  }

  getCategoryList(){
    this.adminService.getCategoriesList().subscribe(
      (data)=>{
        this.categoryList = data;
        
    })
  }

  getTagList(){
    this.adminService.getTagList().subscribe(
      (data)=>{
        this.tagList = data;
        
    })
  }


deleteCategory(slug){
  let confirm = window.confirm('Are you sure want to delete this category?')
      if(confirm){
        this.adminService.deleteCategory(slug).subscribe(
          (data)=>{
            this.toastr.error(data.categoryName, 'Successfully deleted');
            this.getCategoryList()
        })
      }
  
}

deleteTag(slug){
  let confirm = window.confirm('Are you sure want to delete this tag?')
      if(confirm){
        this.adminService.deleteTag(slug).subscribe(
          (data)=>{
            this.toastr.error(data.tagName, 'Successfully deleted');
            this.getTagList()
        })
      }
  
}


}
