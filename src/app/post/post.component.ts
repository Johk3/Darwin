import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AppComponent } from "../app.component"

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
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
export class PostComponent implements OnInit {

	post$: object;

  constructor(private data: DataService, private route: ActivatedRoute, public datway: AppComponent) { 
  	datway.edited = true;
  	this.route.params.subscribe(params => this.post$ = params.id)
  }

  ngOnInit() {
  	this.data.getPost(this.post$).subscribe(
  		data => this.post$ = data
  	)
  }

}
