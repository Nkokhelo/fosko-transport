import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../../add-dialog/add-dialog.component';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/services/driver.service';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  driver: Driver;
  constructor(public dialog: MatDialog, public service: DbcontextService) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { title: 'Driver', name: '' }
    });

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.driver = new Driver('', form.name);
        this.service.save<Driver>(this.driver, 'drivers');
      }
    });
  }
}
