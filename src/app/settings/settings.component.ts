import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component"

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public datway: AppComponent) { 
  	// This is to toggle the sidebar
    datway.edited = true; 
  }

  ngOnInit() {
  }

}
