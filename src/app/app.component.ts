import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-ui';

  ngOnInit(){
    this.reverse1('kiran')
  }

   reverse1(str:any){
    let reversed=''
  
    for(let s of str){
     
       reversed = s + reversed;
    }
  }
  
}
