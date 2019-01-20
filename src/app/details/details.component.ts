import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AppComponent } from "../app.component"
import { CookieService } from 'ngx-cookie-service';
declare var angular: any;

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
  posts: Object;
  message_sent = false;
  no_message = false;
  wait = false;
  id = String;

  constructor(private data: DataService, private route: ActivatedRoute, public datway: AppComponent, private cookieService: CookieService) {
  	// This is to toggle the sidebar
    datway.edited = true; 
    this.route.params.subscribe(params => this.user$ = params.id)
    this.route.params.subscribe(params => this.id = params.id)
  }
  registered: boolean = this.cookieService.check('authtoken');

  name = this.cookieService.get("name");
  img = this.cookieService.get("image");

  public guidGenerator() {
    return '_' + Math.random().toString(36).substr(2, 16);
  }

  public pushMsg() {
    if(!this.message){
      console.log(this.guidGenerator())
      return this.no_message = true;
    }
    let admin = this.cookieService.get("name")
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
    this.message_sent = true;
    var currYear = new Date().getFullYear();
    var currMonth = new Date().getMonth();
    var currDay = new Date().getDate();
    var currHour = new Date().getHours();
    var currMinute = new Date().getMinutes();
    var dttime = `${currDay}.${currMonth+1}.${currYear} ${currHour}:${currMinute}`;
    this.data$["name"] = this.name;
    this.data$["image"] = this.img;
    this.data$["message"] = this.message;
    this.data$["id"] = this.id;
    this.data$["date"] = dttime;
    this.data.postMessage(this.data$).subscribe(
      data => this.data$ = data
    )
  }
  
  ngOnInit() {
    const registered: boolean = this.cookieService.check('authtoken');
  	this.data.getUser(this.user$).subscribe(
  		data => this.user$ = data
  	)
    this.data.getPosts(this.id).subscribe(
      data => this.posts = data
    )
  }

}
