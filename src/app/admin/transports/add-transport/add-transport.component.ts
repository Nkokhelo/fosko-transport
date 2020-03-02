import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Vehicle } from 'src/app/models/vehicle';
import { Department } from 'src/app/models/department';
import { Reason } from 'src/app/models/reason';
import { Destination } from 'src/app/models/destination';
import { Driver } from 'src/app/models/driver';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Transport } from 'src/app/models/transports';
import { toUnicode } from 'punycode';
import { MatSnackBar } from '@angular/material';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.scss']
})
export class AddTransportComponent implements OnInit {
  transportForm: FormGroup;
  vehicles: Vehicle[] = [];
  departments: Department[] = [];
  reasons: Reason[] = [];
  destinations: Destination[] = [];
  drivers: Driver[] = [];
  passengers: string[] = [];
  totalKilometers = 0;
  totalTime = 0;
  isLoaded = false;
  min: Date;
  max: Date;
  timeDisplay = 'Time';
  timeIn: Moment;
  timeOut: Moment;
  transport: Transport = new Transport();
  invalidSelection = false;

  constructor(
    public db: DbcontextService,
    private snackBar: MatSnackBar,
    public transportService: TransportService
  ) {
    this.transportForm = new FormGroup({
      vehicle: new FormControl('', Validators.required),
      driver: new FormControl('', Validators.required),
      companyNo: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      timeIn: new FormControl('', [Validators.required, this.isValidTime]),
      timeOut: new FormControl('', [Validators.required, this.isValidTime]),
      kmOut: new FormControl('', Validators.required),
      kmIn: new FormControl('', Validators.required),
      passengersList: new FormControl('', Validators.required)
    });

    this.transportForm.setValidators(this.checkKm);
  }

  ngOnInit() {
    this.loadDropdownList();
  }

  countPassengers(e) {
    this.passengers = this.transportForm.value.passengersList.split(',');
    this.passengers = this.passengers.filter(p => p.length > 1);
    this.transport.totalPassengers = this.passengers.length;
  }

  calcKilometers(e) {
    const kmIn = this.transportForm.value.kmIn;
    const kmOut = this.transportForm.value.kmOut;
    this.totalKilometers = kmIn > kmOut ? kmIn - kmOut : 0;
  }

  calcTimeIn(e) {
    this.timeIn = moment(e.input.value);
    this.max = new Date(e.input.value);
    this.calcTotalTime();
  }
  calcTimeOut(e) {
    this.timeOut = moment(e.input.value);
    this.min = new Date(e.input.value);
    this.calcTotalTime();
  }

  updateDisplayTime() {
    return this.transport.totalTime > 1
      ? `${this.transport.totalTime} Hour(s)`
      : `${this.transport.totalTime * 60} Minutes`;
  }

  calcTotalTime() {
    if (this.timeIn === undefined || this.timeOut === undefined) return;

    this.invalidSelection = this.timeOut.isAfter(this.timeIn);
    if (this.invalidSelection) return;

    this.transport.totalTime = this.timeIn.diff(this.timeOut, 'hours', true);
    if (this.transport.totalTime > 0)
      this.timeDisplay = this.updateDisplayTime();
  }

  async loadDropdownList() {
    try {
      this.departments = await this.db.list<Department>('departments');
      this.vehicles = await this.db.list<Vehicle>('vehicles');
      this.destinations = await this.db.list<Destination>('destinations');
      this.drivers = await this.db.list<Driver>('drivers');
      this.reasons = await this.db.list<Reason>('reasons');
      console.log('done');
    } catch (e) {
      this.snackBar.open(`${e.message}`);
      console.log(e);
    }

    // this.isLoaded = this.isAllLoaded();
    this.isLoaded = true;
  }
  isAllLoaded() {
    return (
      this.departments.length > 0 &&
      this.vehicles.length > 0 &&
      this.destinations.length > 0 &&
      this.drivers.length > 0 &&
      this.reasons.length > 0
    );
  }

  async onSubmit() {
    console.log('submit');
    if (this.transportForm.valid) {
      console.log('valid');
      this.transport = { ...this.transportForm.value };
      this.transport.timeIn = this.timeIn.toDate();
      this.transport.timeOut = this.timeOut.toDate();
      this.transport.totalTime = this.timeIn.diff(this.timeOut, 'hours', true);
      this.transport.totalKm = this.totalKilometers;
      this.transport.totalPassengers = this.passengers.length;
      try {
        console.log('submit try');
        const d = await this.transportService.addTransport(this.transport);
        console.log(d);
      } catch (e) {
        console.log('submit catch');
        this.snackBar.open(`Error while updating object: ${e}`, 'DISMISS');
        console.log(e);
      }
    }
  }

  checkKm(group: FormGroup) {
    const kmIn = group.controls.kmIn;
    const kmOut = group.controls.kmOut;
    if (kmIn.value < kmOut.value) {
      kmIn.setErrors({ graterValue: true });
    } else {
      kmIn.setErrors(null);
    }
    return null;
  }

  isValidTime(control: AbstractControl): ValidationErrors {
    console.log(control.value);
    return null;
  }
}
