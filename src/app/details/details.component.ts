import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AppComponent } from "../app.component"
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [
  trigger("listStagger", [
      transition("* <=> *", [
          query(":enter", [
              style({opacity:0, transform: "translateY(-45px)"}),
              stagger("50ms",
              animate("350ms ease-out",
              style({opacity: 1, transform: "translateY(0px)"})))
            ], {optional: true}),
          query(':leave', animate('50ms', style({ opacity: 0 })), {
            optional: true
          })
        ])
    ])
  ]
})
export class DetailsComponent implements OnInit {

	user$: Object;
  data$ = {};
  message: String;
  message_sent = false;
  no_message = false;
  wait = false;

  constructor(private data: DataService, private route: ActivatedRoute, public datway: AppComponent, private cookieService: CookieService) {
  	// This is to toggle the sidebar
    datway.edited = true; 
    this.route.params.subscribe(params => this.user$ = params.id)
  }
  registered: boolean = this.cookieService.check('authtoken');

  name = this.cookieService.get("name");
  img = this.cookieService.get("image");

  public pushMsg() {
    if(!this.message){
      return this.no_message = true;
    }

    if(!this.cookieService.get("authtoken") == "ya29.GlyJBjYMov8mpXwe2JT_NpUyCPDgAIscfQ-xXu0GKaooqjp3kMloowjL76DW6WSuZ9gMeR2eDVRIddG3ULfe6qTf_NMJddc0VG1Q1VYzGky9yQdiPur3vIQer0kVHw"){
      if(!this.cookieService.check("post_time")){
        var currentHour = new Date().getUTCHours();
        var currentMinute = new Date().getUTCMinutes();
        var timecookie = `${currentHour} ${currentMinute}`;
        this.cookieService.set("post_time", timecookie);
        this.wait = true;
        return;
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
    }

    this.message_sent = true;
    this.data$["name"] = this.name;
    this.data$["image"] = this.img;
    this.data$["message"] = this.message;
    this.data$["post_name"] = this.user$[0].name;
    this.data.postMessage(this.data$).subscribe(
      data => this.data$ = data
    )
  }
  
  ngOnInit() {
    const registered: boolean = this.cookieService.check('authtoken');
  	this.data.getUser(this.user$).subscribe(
  		data => this.user$ = data
  	)
  }

}
