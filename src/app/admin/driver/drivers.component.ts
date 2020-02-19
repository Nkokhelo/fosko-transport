import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Driver } from 'src/app/models/driver';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Subscription } from 'rxjs';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  driver: Driver;
  collectionName = 'drivers';
  // set up display columns for this component
  displayedColumns = ['name', 'totalTransports', 'createdAt'];
  subscription: Subscription;

  drivers: Driver[];

  constructor(
    public dialog: MatDialog,
    public contextService: DbcontextService,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.contextService
      .all<Driver>(this.collectionName)
      .subscribe(d => {
        this.drivers = d;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { title: 'Driver', name: '' }
    });

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.driver = new Driver('', form.name);
        this.contextService.save<Driver>(this.driver, this.collectionName);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
