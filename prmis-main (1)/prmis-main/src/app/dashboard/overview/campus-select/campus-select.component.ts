import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'campus-select',
  templateUrl: './campus-select.component.html',
  styleUrls: ['./campus-select.component.scss'],
})
export class CampusSelectComponent implements OnInit {
  @Input('default') default: KeyValue<string, string> = {
    key: 'alangilan',
    value: 'Alangilan',
  };
  @Input('placeholder') placeholder: string | undefined;
  @Output() campusChange = new EventEmitter<string>();
  campuses: KeyValue<string, string>[] = [
    { key: 'alangilan', value: 'Alangilan' },
    { key: 'pablo-borbon', value: 'Pablo-Borbon' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onCampusChange(campus: string) {
    this.campusChange.emit(campus);
  }
}
