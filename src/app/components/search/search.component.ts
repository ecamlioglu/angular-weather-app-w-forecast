import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() location: string = '';
  @Output() locationChange = new EventEmitter<string>();

  search() {
    this.locationChange.emit(this.location);
  }
}