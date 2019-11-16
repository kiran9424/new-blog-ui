import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Authservice } from './auth.service';


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
  private url: string;

  constructor(private auth: Authservice,
    private router: Router) { }

  private handleAuthState(): boolean {

    if (this.isLoginOrRegister()) {

      this.router.navigate(['/']);
      return false;
    } else {

      return true;
    }
  }

  private handleNotAuthState(): boolean {

    if (this.isLoginOrRegister()) {

      return true;
    } else {

      this.router.navigate(['/signin']);
      return false;
    }
  }

  private isLoginOrRegister(): boolean {
    if (this.url.includes('signin') || this.url.includes('signup')) {
      return true;
    } else {

      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url = state.url;

    if (this.auth.isAuthenticated()) {
      return this.handleAuthState();
    } else {

      return this.handleNotAuthState();
    }
  }

}