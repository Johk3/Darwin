import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component"
import { CookieService } from 'ngx-cookie-service';
import { DataService } from "../data.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	img: String;
	name: String;
	email: String;

  constructor(public datway: AppComponent, private data: DataService, private cookieService: CookieService) { 
  	// This is to toggle the sidebar
    datway.edited = true; 
  }

  ngOnInit() {
  	console.log(this.cookieService.getAll())
  	this.img = this.cookieService.get("image")
  	this.name = this.cookieService.get("name")
  	this.email = this.cookieService.get("email")
  }

}
