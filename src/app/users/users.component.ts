import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { AppComponent } from "../app.component"
import { Observable } from "rxjs";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';

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
  cookieValue = 'UNKNOWN';
  search: Object;

  constructor(private data: DataService, public datway: AppComponent, private cookieService: CookieService) {
    // This is to toggle the sidebar
    datway.edited = true; 
  }

  public isEmpty() {
    for(var key in this.search) {
        if(this.search.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  ngOnInit() {
    this.search = Object;
    const cookieExists: boolean = this.cookieService.check('token');
    if(!cookieExists){
       let cookie =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
       this.cookieService.set( 'token', cookie );
       this.cookieValue = this.cookieService.get('token');
    }
  	this.data.getUsers().subscribe(
  			data => this.users$ = data
  		)
    this.data.searchGet().subscribe(
      data => this.search = data
    )
  }

}
