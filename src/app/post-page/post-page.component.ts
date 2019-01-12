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

  constructor(private data: DataService, private cookieService: CookieService, public datway: AppComponent) { 
  	datway.edited = true; 
  }

  registered: boolean = this.cookieService.check('authtoken');
  name = this.cookieService.get("name");
  img = this.cookieService.get("image");

  public Submit(subject, message){
  	this.toolong = false;
    this.nomessage = false;
    this.wait = false;

    console.log(this.cookieService.getAll())

  	if(subject.length >= 200 || message.length >= 10000){
  		this.toolong = true;
  	}
  	if(!subject || !message){
  		this.nomessage = true;
  	}if (!this.nomessage && !this.toolong){
  		console.log("yuh")
  		// Time limit
  	  if(!this.cookieService.check("post_time")){
        var currentHour = new Date().getUTCHours();
        var currentMinute = new Date().getUTCMinutes();
        var timecookie = `${currentHour} ${currentMinute}`;
        this.cookieService.set("post_time", timecookie);
        this.wait = false;
      }
      if(this.cookieService.check("post_time")){
        var currHour = new Date().getUTCHours();
        var currMinute = new Date().getUTCMinutes();
        var timecookiec = this.cookieService.get("post_time");
        let prevtime = timecookiec.split(" ").map(function (val) { return +val; });
        if(currHour - prevtime[0] > 0 || currMinute - prevtime[1] > 5){
          this.cookieService.delete("post_time");
          this.wait = false;
        }else{
          this.wait = true;
        }
  	}
  	this.transaction = true;
  	}
	}



  ngOnInit() {
  	this.registered = this.cookieService.check('authtoken');
  }

}
