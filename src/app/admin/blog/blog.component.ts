import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  someValue: any;
  categories: any;
  tags: [] = [];
  categoriesIdList = [];
  tagIdList = [];
  categoriesTagsChecked:boolean
  editorForm: FormGroup
  constructor(private adminService: AdminService, public fb: FormBuilder,private toastr: ToastrService) {
    this.editorForm = this.fb.group({
      title: [''],
      photo: [null],
      body: [''],
      categories: [null],
      tags: [null]
    })
  }

  ngOnInit() {


    this.getAllCategories();
    this.getAllTags()
    this.getTheValuesFromLocalStroage();

  }

  blogTitle(event, value) {
    if (value === 'photo') {
      const file = (event.target as HTMLInputElement).files[0];
      this.editorForm.patchValue({
        photo: file
      });
      this.editorForm.get('photo').updateValueAndValidity()
    } else {
      this.editorForm.patchValue({
        title: event.target.value
      });
      this.editorForm.get('title').updateValueAndValidity()

    }


 

  }
  blogContent() {
    this.editorForm.valueChanges.subscribe(data => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('blog', JSON.stringify(data.body))
      }
    
      this.editorForm.patchValue({
        body:data.body
      })
      this.editorForm.get('body').updateValueAndValidity()
      
    })

  }

  getTheValuesFromLocalStroage() {
    if (typeof window === 'undefined') {
      return false;
    } else {
      if (localStorage.getItem('blog')) {
        return this.someValue = JSON.parse(localStorage.getItem('blog'))
      } else {
        return false;
      }
    }
  }

  getAllCategories() {
    this.adminService.getCategoriesList().subscribe((data) => {
      this.categories = data
    })
  }

  getAllTags() {
    this.adminService.getTagList().subscribe((data) => {
      this.tags = data;
    })
  }

  categoryHandled(id, index) {
    if (this.categoriesIdList.indexOf(id) === -1) {
      this.categoriesIdList.push(id);
      var finalList = this.categoriesIdList.toString()
      finalList.replace(/[\[\]']+/g, '');
      this.editorForm.patchValue({
        categories: finalList
      })
      this.editorForm.get('categories').updateValueAndValidity()
    
    } else {
      this.categoriesIdList.splice(this.categoriesIdList.indexOf(id), 1)
      var finalList = this.categoriesIdList.toString()
      finalList.replace(/[\[\]']+/g, '');
      this.editorForm.patchValue({
        categories: finalList
      })
      this.editorForm.get('categories').updateValueAndValidity()
      

    }
    


  }

  tagHandled(id) {
    if (this.tagIdList.indexOf(id) === -1) {
      this.tagIdList.push(id);
      var finalList = this.tagIdList.toString()
      finalList.replace(/[\[\]']+/g, '');
      this.editorForm.patchValue({
        tags: finalList
      })
      this.editorForm.get('tags').updateValueAndValidity()
    } else {
      this.tagIdList.splice(this.tagIdList.indexOf(id), 1)
      var finalList = this.tagIdList.toString()
      finalList.replace(/[\[\]']+/g, '');
      this.editorForm.patchValue({
        tags: finalList
      })
      this.editorForm.get('tags').updateValueAndValidity()

    }
    
  }

  publishBlog() {
    var blogData = new FormData()
    blogData.append('title',this.editorForm.get('title').value);
    blogData.append('body',this.editorForm.get('body').value);
    blogData.append('photo',this.editorForm.get('photo').value);
    blogData.append('categories',this.editorForm.get('categories').value);
    blogData.append('tags',this.editorForm.get('tags').value);

    this.adminService.createBlog(blogData).subscribe(
      (data) => {
        this.toastr.success(data.title, 'Successfully blog is published by title');
        localStorage.removeItem('blog');
        this.categoriesTagsChecked = false
        this.editorForm.reset();

      },(error)=>{
        this.toastr.error(error.error.error,'Error')
      })

  }
}
