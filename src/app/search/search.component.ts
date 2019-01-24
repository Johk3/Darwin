import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { UsersComponent } from "../users/users.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  checknum = 0;
  constructor(private data: DataService, private users: UsersComponent) { 
  }

  public searchFor(message){
  	if(message.length == 0){
  		this.users.getSearch(false)
  	}
  	if(message.length >= 3 && this.checknum == 0){
  		message = {message}
  		this.data.searchService(message).subscribe(
  			data => message = data
  		)
  		this.checknum++
  		this.users.getSearch(true)
  	}else{
  		this.checknum = 0
  	}
  }

  ngOnInit() {
  }

}
