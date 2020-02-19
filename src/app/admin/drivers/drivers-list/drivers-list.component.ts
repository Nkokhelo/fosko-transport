import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DriversListDataSource } from './drivers-list-datasource';
import { Driver } from 'src/app/models/driver';
import { DbcontextService } from 'src/app/services/dbcontext.service';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Driver>;
  dataSource: DriversListDataSource;

  constructor(public context: DbcontextService) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'totalTransports', 'registrationDate'];

  ngOnInit() {}

  ngAfterViewInit() {
    this.context.all<Driver>('drivers').subscribe(drivers => {
      this.dataSource = new DriversListDataSource(drivers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
}
