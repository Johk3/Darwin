import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public edited = false;
  title = 'Datinxy';
  ngOnInit() {

	if (environment.production) {
   if (location.protocol === 'http:') {
    window.location.href = location.href.replace('http', 'https');
   }
  }    
 }
}
