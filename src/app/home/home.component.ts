import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from "../app.component"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, public datway: AppComponent) { 
  	datway.edited = true;
  }

  ngOnInit() {
  }

}
