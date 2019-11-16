import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Authservice } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({providedIn:'root'})
export class AdminAuthGaurd implements CanActivate {
  private token: string;
  private jwt = new JwtHelperService();
  private userProfile:any;

  constructor(private auth: Authservice,
    private router: Router) { }

  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
        this.token = this.auth.getAuthToken();
        this.userProfile = this.jwt.decodeToken(this.token);
        if(this.userProfile.role === 1){
           return true;
        }else{
            this.router.navigate(['/'])
        }

  }

}