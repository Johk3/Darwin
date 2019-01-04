import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AppComponent } from "../app.component"


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

  constructor(private data: DataService, private route: ActivatedRoute, public datway: AppComponent) {
  	// This is to toggle the sidebar
    datway.edited = true; 
    this.route.params.subscribe(params => this.user$ = params.id)
  }

  ngOnInit() {
  	this.data.getUser(this.user$).subscribe(
  		data => this.user$ = data
  	)
  }

}
