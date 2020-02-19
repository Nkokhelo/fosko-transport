import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDialogComponent } from '../../add-dialog/add-dialog.component';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  constructor(
    public dialog: MatDialog,
    public vehicleServices: VehicleService
  ) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { title: 'Vehicle', name: this.vehicle.name }
    });

    dialogRef.afterClosed().subscribe(form => {
      console.log(form.name);
      this.vehicle.name = form.name;
      this.vehicleServices.saveVehicle(this.vehicle);
    });
  }
}
