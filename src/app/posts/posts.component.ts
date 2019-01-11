import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AppComponent } from "../app.component"
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
  trigger("listStagger", [
      transition("* <=> *", [
          query(":enter", [
              style({opacity:0, transform: "translateY(-45px)"}),
              stagger("50ms",
              animate("450ms ease-out",
              style({opacity: 1, transform: "translateY(0px)"})))
            ], {optional: true}),
          query(':leave', animate('50ms', style({ opacity: 0 })), {
            optional: true
          })
        ])
    ])
]
})
export class PostsComponent implements OnInit {
	
	posts$: Object;

  constructor(private data: DataService, public datway: AppComponent, private cookieService: CookieService) { 
    // This is to toggle the sidebar
    datway.edited = true; 
  }

  registered: boolean = this.cookieService.check('authtoken');

  ngOnInit() {
    this.registered = this.cookieService.check('authtoken');
  }

}
