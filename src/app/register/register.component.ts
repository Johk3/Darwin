import { Component, OnInit } from '@angular/core';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( private socialAuthService: AuthService, private cookieService: CookieService ) {}
  	cookieValue = 'UNKNOWN';
  	registered = false;
  	img = this.cookieService.get("image");
  	name = this.cookieService.get("name");

	public socialSignIn(socialPlatform : string) {
		let socialPlatformProvider;
		if(socialPlatform == "facebook"){
		  socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
		}else if(socialPlatform == "google"){
		  socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
		}

		this.socialAuthService.signIn(socialPlatformProvider).then(
		  (userData) => {
		    // Now sign-in with userData
		    // ...
		    const cookieExists: boolean = this.cookieService.check('token');
		    if(!cookieExists){
		       console.log("Creating new cookie")
		       let cookie =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		       this.cookieService.set( 'token', cookie );
		       this.cookieValue = this.cookieService.get('token');
		    }
		    this.cookieService.set( 'authtoken', userData.token );
		    this.cookieService.set( 'name', userData.name );
		    this.cookieService.set( 'image', userData.image );
		    this.registered = true;
		  }
		)
  }

  ngOnInit() {
  	const accountExists: boolean = this.cookieService.check('authtoken');
  	if(accountExists){
  		this.registered = true;
  	}
}
}
