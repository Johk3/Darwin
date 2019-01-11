import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from "../data.service";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AppComponent } from "../app.component"

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  nomessage: boolean;
  transaction: boolean;
  constructor(private data: DataService, private cookieService: CookieService, public datway: AppComponent) { 
  	datway.edited = true; 
  }

  registered: boolean = this.cookieService.check('authtoken');
  name = this.cookieService.get("name");
  img = this.cookieService.get("image");

  public Submit(subject, message){
  	if(!subject || !message){
  		this.nomessage = true;
  	}else{
  		this.nomessage = false;
  	}
  	this.transaction = true;
  }

  ngOnInit() {
  	this.registered = this.cookieService.check('authtoken');
  }

}
