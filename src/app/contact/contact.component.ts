import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from "../data.service";
import { AppComponent } from "../app.component"


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  nomessage: boolean;
  transaction: boolean;
  toolong: boolean;
  wait: boolean;
  signedin: boolean;
  notitle: boolean;
  data$ = {};

  constructor(private datway: AppComponent, private data: DataService, private cookieService: CookieService) { 
  	datway.edited = true;
  }

  public Submit(title, description){
  	this.toolong = false;
    this.notitle = false;
    this.wait = false;
    this.signedin = this.cookieService.check('authtoken');

    if(!description || !title){
  		this.notitle = true;
  	}
  	if(!this.notitle){
  		if(description.length >= 200 || title.length >= 10000){
  			this.toolong = true;
  		}
  	}if (!this.notitle && !this.toolong && this.signedin){
  		// Time limit
  		if(this.cookieService.check("post_time")){
        var currHour = new Date().getUTCHours();
        var currMinute = new Date().getUTCMinutes();
        var timecookiec = this.cookieService.get("post_time");
        let prevtime = timecookiec.split(" ").map(function (val) { return +val; });
        // CHANGE THE 0 TO 5
        if(currHour - prevtime[0] > 0 || currMinute - prevtime[1] > 0){
          this.cookieService.delete("post_time");
          this.wait = false;
        }else{
          this.wait = true;
          return;
        }
  	}
  	  if(!this.cookieService.check("post_time")){
        var currentHour = new Date().getUTCHours();
        var currentMinute = new Date().getUTCMinutes();
        var timecookie = `${currentHour} ${currentMinute}`;
        this.cookieService.set("post_time", timecookie);
        this.wait = false;
      }
  	
  	if(!this.wait){
	  	var currYear = new Date().getFullYear();
	    var currMonth = new Date().getMonth();
	    var currDay = new Date().getDate();
	    var currHour = new Date().getHours();
	    var currMinute = new Date().getMinutes();
	    var dttime = `${currDay}.${currMonth+1}.${currYear} ${currHour}:${currMinute}`;
	    let id = Math.random().toString(36).substring(2, 16);

	    let name = this.cookieService.get("name");
	  	let img = this.cookieService.get("image");
	  	let email = this.cookieService.get("email");

	    this.data$["name"] = name;
	    this.data$["title"] = title;
	    this.data$["date"] = dttime;
	    this.data$["description"] = description;
	    this.data$["email"] = email;
	    this.data.postContact(this.data$).subscribe(
	    	data => this.data$ = data
	    )
  	}
  	}
  	this.transaction = true;
  }

  ngOnInit() {
  }

}
