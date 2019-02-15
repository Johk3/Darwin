import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component"

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private datway: AppComponent) { 
  	datway.edited = true; 
  }

  ngOnInit() {
  }

}
