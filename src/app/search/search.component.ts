import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  checknum = 0;
  constructor(private data: DataService) { 
  }

  public wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
	}
  }

  public searchFor(message){
  	if(message.length >= 3 && this.checknum == 0){
  		message = {message}
  		this.data.searchService(message).subscribe(
  			data => message = data
  		)
  		this.checknum++
  	}else{
  		this.checknum = 0
  	}
  }

  ngOnInit() {
  }

}
