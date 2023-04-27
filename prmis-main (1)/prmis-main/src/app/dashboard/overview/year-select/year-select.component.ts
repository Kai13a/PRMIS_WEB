import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.scss'],
})
export class YearSelectComponent implements OnInit {
  @Input('endYear') endYear: number = new Date().getFullYear();
  @Input('beginYear') beginYear: number = this.endYear;
  @Input('placeholder') placeholder: string | undefined;
  @Output() yearChange = new EventEmitter<number>();

  years: number[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.beginYear, this.endYear);
    for (let i = this.endYear; i >= this.beginYear; i--) {
      this.years.push(i);
    }
  }

  onYearChange(year: string) {
    this.yearChange.emit(Number.parseInt(year));
  }
}
