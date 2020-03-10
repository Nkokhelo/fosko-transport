import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Driver } from 'src/app/models/driver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  drivers: any[];
  vehicles: any[];
  destinations: any[];
  departments: any[];
  reasons: any[];
  colourValues = {
    domain: [
      '#4850bd',
      '#ffb43c',
      '#6B8795',
      '#d5ff3c',
      '#ff3cd8',
      '#E3E7D4',
      '#6895BE',
      '#E3E7D4',
      '#438DB0',
      '#687383',
      '#203540',
      '#99B169',
      '#A28660',
      '#5F4016',
      '#AE5555',
      '#D19F8E'
    ]
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private context: DbcontextService
  ) {}

  async ngOnInit() {
    this.drivers = await this.makeChartData('drivers');
    this.vehicles = await this.makeChartData('vehicles');
    this.destinations = await this.makeChartData('destinations');
    this.departments = await this.makeChartData('departments');
    this.reasons = await this.makeChartData('reasons');
    const transportsList = await this.context.list<Transport>('transports');
    console.log(this.vehicles);
  }

  groupBy(arr: any[], prop: string) {
    return arr.reduce((groups, item) => {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }
  async makeChartData(path: string) {
    const list = await this.context.list<Driver>(path);
    return list
      .filter(d => d.totalTransports > 0)
      .map(d => ({
        name: d.name,
        value: d.totalTransports
      }));
  }
}
