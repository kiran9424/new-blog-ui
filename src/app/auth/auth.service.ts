import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';





const jwt = new JwtHelperService();
class DecodeToken {
    exp: number = 0;
    name:string=''
}

@Injectable({providedIn:'root'})
export class Authservice{
    private decodedToken;
    constructor(private http:HttpClient,private cookierService:CookieService){
        this.decodedToken = JSON.parse(localStorage.getItem('blog-meta')) || new DecodeToken();
    }

    private saveToken(token: any): string {

        this.decodedToken = jwt.decodeToken(token);
        localStorage.setItem('blog-auth', token);
        localStorage.setItem('blog-meta', JSON.stringify(this.decodedToken));
        return token;
    }

    private getExpirtaion() {
        return moment.unix(this.decodedToken.exp);
    }

    public isAuthenticated(): boolean {
        return moment().isBefore(this.getExpirtaion());
    }
    public logout() {
        localStorage.removeItem('blog-auth');
        localStorage.removeItem('blog-meta');
        this.cookierService.delete('auth');
        this.decodedToken = new DecodeToken();

        //return this.http.post('/api/signout');
    }

    signin(data):Observable<any>{
        return this.http.post('/api/v1/signin',data).pipe(map(
            (token: string) => this.saveToken(token)));
    }

    signUp(data):Observable<any>{
        return this.http.post('/api/v1/signup',data)
    }

    public getUserName(){
        return this.decodedToken.name;
    }

    public getAuthToken(){
        return localStorage.getItem('blog-auth')
    }

    
    loginWithGoogle(data):Observable<any>{
        return this.http.post('/api/v1/google-login',data).pipe(map(
            (token: string) => this.saveToken(token)));
    }
}