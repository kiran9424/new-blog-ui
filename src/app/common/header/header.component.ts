import { Component, OnInit } from '@angular/core';
import { Authservice } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
token:string;
userProfile:any;
jwt = new JwtHelperService();
  constructor(public authService:Authservice,private router:Router, ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/signin'])
  }

  dashBoard(){
    
   this.token =  this.authService.getAuthToken();
   this.userProfile = this.jwt.decodeToken(this.token);
   if(this.userProfile.role ===1){
     this.router.navigate(['/admin'])
   }else{
     this.router.navigate(['/user'])
   }
   
  }

}
