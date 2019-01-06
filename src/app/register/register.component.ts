import { Component, OnInit } from '@angular/core';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
declare var angular: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( private socialAuthService: AuthService, private cookieService: CookieService, private route: RouterModule ) {}
  	cookieValue = 'UNKNOWN';
  	registered = false;
  	img = this.cookieService.get("image");
  	name = this.cookieService.get("name");

  	public signout(){
  		this.cookieService.delete("email");
  		this.cookieService.delete("authtoken");
  		this.cookieService.delete("image");
  		this.cookieService.delete("name");
  		this.registered = false;
  	}

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
		       let cookie =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		       this.cookieService.set( 'token', cookie );
		       this.cookieValue = this.cookieService.get('token');
		    }
		    this.cookieService.set( 'authtoken', userData.token );
		    this.cookieService.set( 'name', userData.name );
		    this.cookieService.set( 'image', userData.image );
		    if(this.cookieService.check("authtoken")){
		    	this.registered = true;
		    }
		    this.img = this.cookieService.get("image");
  			this.name = this.cookieService.get("name");
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
