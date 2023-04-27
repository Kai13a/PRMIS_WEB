import { Component, Input } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input('headers') headers: string[] = [];
  @Input('data') data: string[][] = [];

  ngOnInit(): void {}
}
