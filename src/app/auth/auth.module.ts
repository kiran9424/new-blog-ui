import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';
import { FormsModule } from '@angular/forms';
import { Authservice,} from './auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.gaurd';
import { TokenInterceptor } from './token.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';

export function provideConfig() {
    const google_oauth_client_id: string = '***************************';
    let config = new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(google_oauth_client_id)
        }
    ])
    return config;
}


@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        HttpClientModule,
        SocialLoginModule

    ],
    providers: [
        Authservice,
        AuthGuard,
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig

        }
    ],
    exports: []
})
export class AuthModule {

}