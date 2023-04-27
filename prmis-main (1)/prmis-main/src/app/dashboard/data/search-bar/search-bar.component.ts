import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {}

  onSearch(search: string) {
    this.search.emit(search);
  }
}
