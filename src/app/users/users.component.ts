import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { AppComponent } from "../app.component"
import { Observable } from "rxjs";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
  	trigger("listStagger", [
  			transition("* <=> *", [
  					query(":enter", [
  							style({opacity:0, transform: "translateY(-45px)"}),
  							stagger("50ms",
  							animate("550ms ease-out",
  							style({opacity: 1, transform: "translateY(0px)"})))
  						], {optional: true}),
			      query(':leave', animate('50ms', style({ opacity: 0 })), {
			        optional: true
			      })
  				])
  		])
  ]
})
export class UsersComponent implements OnInit {
	users$: Object;
 
  constructor(private data: DataService, public datway: AppComponent) {
    // This is to toggle the sidebar
    datway.edited = true; 
  }

  ngOnInit() {
  	this.data.getUsers().subscribe(
  			data => this.users$ = data
  		)
  }

}
