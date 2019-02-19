import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component"

@Component({
  selector: 'app-teamwork',
  templateUrl: './teamwork.component.html',
  styleUrls: ['./teamwork.component.scss']
})
export class TeamworkComponent implements OnInit {

  constructor(private datway: AppComponent) { 
  	datway.edited = true;
  }

  ngOnInit() {
  }

}
