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
  toolong: boolean;
  wait: boolean;
  signedin: boolean;
  data$ = {};
  posts$: object;

  constructor(private data: DataService, private cookieService: CookieService, public datway: AppComponent) { 
  	datway.edited = true; 
  }

  registered: boolean = this.cookieService.check('authtoken');

  public Submit(subject, message){
  	this.toolong = false;
    this.nomessage = false;
    this.wait = false;
    this.signedin = this.cookieService.check('authtoken');

    if(!subject || !message){
  		this.nomessage = true;
  	}
  	if(!this.nomessage){
  		if(subject.length >= 200 || message.length >= 10000){
  			this.toolong = true;
  		}
  	}if (!this.nomessage && !this.toolong && this.signedin){
  		// Time limit
  		if(this.cookieService.check("post_time")){
        var currHour = new Date().getUTCHours();
        var currMinute = new Date().getUTCMinutes();
        var timecookiec = this.cookieService.get("post_time");
        let prevtime = timecookiec.split(" ").map(function (val) { return +val; });
        // CHANGE THE 0 TO 5
        if(currHour - prevtime[0] > 0 || currMinute - prevtime[1] > 5){
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

	    this.data$["name"] = name;
	    this.data$["image"] = img;
	    this.data$["message"] = message;
	    this.data$["id"] = id;
	    this.data$["date"] = dttime;
	    this.data$["subject"] = subject;
	    this.data.postMessage(this.data$).subscribe(
	      data => this.data$ = data
	    )
  	}
  	}
  	this.transaction = true;
	}



  ngOnInit() {
  	this.registered = this.cookieService.check('authtoken');
  }

}
