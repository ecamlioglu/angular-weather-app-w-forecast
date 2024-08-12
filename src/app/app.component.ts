import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  location: string = '';

  updateLocation(newLocation: string) {
    this.location = newLocation;
  }
}