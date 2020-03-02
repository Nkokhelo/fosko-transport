import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Subscription } from 'rxjs';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {
  vehicle: Vehicle;
  collectionName = 'vehicles';
  displayedColumns: string[] = ['name', 'totalTransports', 'createdAt'];
  subscription: Subscription;

  vehicles: Vehicle[];

  constructor(
    public dialog: MatDialog,
    public contextService: DbcontextService
  ) {}

  ngOnInit() {
    this.subscription = this.contextService
      .all<Vehicle>(this.collectionName)
      .subscribe(d => {
        if (d.length > 0) this.vehicles = d;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { title: 'Vehicle', name: '' }
    });

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.vehicle = new Vehicle('', form.name);
        this.contextService.save<Vehicle>(this.vehicle, this.collectionName);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
