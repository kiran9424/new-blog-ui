import { Component, OnInit } from '@angular/core';
import { Authservice } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error:string;
  message:string;
  signupData={};
  constructor(private authService:Authservice) { }

  ngOnInit() {
  }

  signupFormData(){
    console.log(this.signupData);
    this.authService.signUp(this.signupData).subscribe(
      (data)=>{
          this.message = data.message;
        
      },(errors)=>{
        this.error = errors.error
      })
    
  }

}
