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
import { async } from '@angular/core/testing';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

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
    'destination',
    'timeOut',
    'timeIn',
    'totalPassengers',
    'totalKm',
    'driver',
    'vehicle'
  ];
  constructor(
    public contextService: DbcontextService,
    public db: AngularFirestore,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscription = this.contextService
      .all<Transport>(this.collectionName)
      .subscribe(
        async d => {
          console.log('subscribe');
          const transportData = await this.makeTransportTable(d);
          console.log('await finished');
          this.dataSource.data = transportData;
          this.transports = transportData;
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
    try {
      const list = await this.contextService.list<Listing>(collection);
      return list.filter(d => d.id === id)[0].name;
    } catch (e) {
      console.log(e);
      this.snackBar.open('Error : ' + e, 'DISMISS');
    }
  }

  async makeTransportTable(d: Transport[]) {
    console.log('make Transport table');
    try {
      return await Promise.all(
        d.map(async t => {
          console.log('promise ma asnyc');
          const vehicleName = await this.getName(t.vehicle, 'vehicles');
          const driverName = await this.getName(t.driver, 'drivers');
          const destinationName = await this.getName(
            t.destination,
            'destinations'
          );
          console.log('getname done');
          const transport: Transport = new Transport(
            '',
            '',
            t.passengers,
            t.totalPassengers,
            '',
            '',
            destinationName,
            '',
            driverName,
            vehicleName,
            t.timeOut,
            t.timeIn,
            0,
            0,
            0,
            t.totalKm
          );
          return transport;
        })
      );
    } catch (e) {
      this.snackBar.open(e);
    }
  }
}
