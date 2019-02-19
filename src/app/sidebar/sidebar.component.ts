import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( ) { 
  }
  // settings = false;
  // img = this.cookieService.get("image");

  ngOnInit() {
  	// const accountExists: boolean = this.cookieService.check('authtoken');
  	// if(accountExists){
  	// 	this.settings = true;
  	// }
  }

}
