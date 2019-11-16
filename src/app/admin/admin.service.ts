import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({providedIn:'root'})
export class AdminService{
    constructor(private http:HttpClient){

    }

    createCategory(data):Observable<any>{
        return this.http.post('/api/v1/createcategory',data)
    }

    createTag(data):Observable<any>{
        return this.http.post('/api/v1/createtag',data)
    }

    getCategoriesList():Observable<any>{
         return this.http.get('/api/v1/categories');
    }

    getTagList():Observable<any>{
        return this.http.get('/api/v1/tags');
   }

    deleteCategory(data):Observable<any>{
        return this.http.delete('/api/v1/categories/' + data)
    }

    
    deleteTag(data):Observable<any>{
        return this.http.delete('/api/v1/tag/' + data)
    }

    createBlog(data):Observable<any>{
        const token = localStorage.getItem('blog-auth')
        return this.http.post('/api/v1/createblog', data);
    }

    getAllBlogsCategoriesTagsList():Observable<any>{
        return this.http.post('/api/v1/blogs-categories-tags',undefined)
    }

    // getBlogsPic(slug):Observable<File>{
    //      return this.http.get('/api/v1/blog-pic/', { responseType: ResponseContentType.Blob })
    //      .map((res: Response) => res.blob());
    // }
}