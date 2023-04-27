import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 2],
        label: 'Employees',
        tension: 0.5,
        borderColor: 'red',
      },
      {
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 2],
        label: 'Faculty',
        tension: 0.5,
        borderColor: 'green',
      },
      {
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 2],
        label: 'Job Personnel',
        tension: 0.5,
        borderColor: 'blue',
      },
      {
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 2],
        label: 'Admin',
        tension: 0.5,
        borderColor: 'yellow',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;
  constructor() {}

  ngOnInit(): void {}
}
