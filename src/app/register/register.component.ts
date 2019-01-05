import { Component, OnInit } from '@angular/core';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( private socialAuthService: AuthService ) {}

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
		    console.log(userData);
		  }
		)
  }

  ngOnInit() {

}
}
