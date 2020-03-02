import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TransportListDataSource } from './transport-list-datasource';
import { Transport } from 'src/app/models/transports';
import { Subscription } from 'rxjs';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { MatSnackBar } from '@angular/material';
import { Vehicle } from 'src/app/models/vehicle';
import { Listing } from 'src/app/intefaces/listing';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.scss']
})
export class TransportListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Transport>;

  transport: Transport;
  collectionName = 'transports';
  subscription: Subscription;
  add: boolean;
  transports: Transport[];

  dataSource: TransportListDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [
    'vehicle',
    'transportationDate',
    'timeOut',
    'timeIn',
    'totalPassengers',
    'totalKm'
  ];
  constructor(
    public contextService: DbcontextService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscription = this.contextService
      .all<Transport>(this.collectionName)
      .subscribe(
        d => {
          this.dataSource.data = d;
          this.transports = d;
        },
        error => {
          this.snackBar.open(error, 'DISMISS', { duration: 5000 });
        }
      );
    this.dataSource = new TransportListDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async getName(id, collection) {
    const obj: Listing = await this.contextService
      .get<Listing>(id, 'vehicles')
      .valueChanges()
      .toPromise();
    return obj.name;
  }
}
