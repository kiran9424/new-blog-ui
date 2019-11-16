import { Component, OnInit } from '@angular/core';
import { Authservice } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from "angular-6-social-login";
import {GoogleLoginProvider } from "angular-6-social-login";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  error:string;
  message:string;
  userProfile:any;
  signinData={}
  user:any;
  jwt = new JwtHelperService();
 
  constructor(private authService:Authservice,private router:Router, private googleAuthService:AuthService) { }

  ngOnInit() {
  }

  signInWithGoogle() {
      this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res)=>{
     
     const idToken = res.idToken;
     const user  ={idToken}
     this.authService.loginWithGoogle(user).subscribe(
       (data)=>{
        
        this.userProfile = this.jwt.decodeToken(data);
        if(this.userProfile.role === 1){
          this.router.navigate(['/admin'])
        }else{
          this.router.navigate(['/user'])
        }
     })
    });
   
    
   
  }

  siginFormData(){
    this.authService.signin(this.signinData).subscribe(
      (data)=>{
        this.userProfile = this.jwt.decodeToken(data);
        if(this.userProfile.role === 1){
          this.router.navigate(['/admin'])
        }else{
          this.router.navigate(['/user'])

        }
        this.message = data.message;

      },(errors)=>{
        this.error = errors.error
      })
  }

}
