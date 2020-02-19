import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private db: AngularFirestore) {}

  saveVehicle(vehicle: Vehicle) {
    this.db
      .collection('vehicles')
      .add({ ...vehicle })
      .catch(e => {
        console.log(e);
      });
  }

  getAllVehicles() {
    return this.db.collection<Vehicle>('vehicles').valueChanges();
  }

  getVehicle(vehicleId) {
    return this.db.collection('vehicles').doc<Vehicle>(`${vehicleId}`);
  }
}
