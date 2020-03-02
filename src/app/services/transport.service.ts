import { Injectable } from '@angular/core';
import { Transport } from '../models/transports';
import { DbcontextService } from './dbcontext.service';
import { Vehicle } from '../models/vehicle';
import { Department } from '../models/department';
import { Destination } from '../models/destination';
import { Driver } from '../models/driver';
import { Reason } from '../models/reason';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Listing } from '../intefaces/listing';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  constructor(
    private db: AngularFirestore,
    private context: DbcontextService
  ) {}

  async addTransport(transport: Transport) {
    console.log('add transport');
    const depRef = this.db
      .collection<Department>('departments')
      .doc(transport.department).ref;
    const vehicleRef = this.db
      .collection<Vehicle>('vehicles')
      .doc(transport.vehicle).ref;
    const driverRef = this.db
      .collection<Driver>('drivers')
      .doc(transport.driver).ref;
    const reasonRef = this.db
      .collection<Reason>('reasons')
      .doc(transport.reason).ref;
    const desRef = this.db
      .collection<Destination>('destinations')
      .doc(transport.destination).ref;
    const id = this.db.createId();
    const transRef = this.db.collection<Transport>('transports').doc(id).ref;
    console.log('after refs');
    const department = (await depRef.get()).data() as Listing;
    const vehicle = (await vehicleRef.get()).data() as Listing;
    const driver = (await driverRef.get()).data() as Listing;
    const reason = (await reasonRef.get()).data() as Listing;
    const destination = (await desRef.get()).data() as Listing;

    console.log('before transaction');
    return this.db.firestore.runTransaction(t => {
      console.log('transaction');
      return t
        .get(transRef)
        .then(async tDoc => {
          t.set(transRef, transport);
          try {
            console.log('trying');
            await this.updateDocument(depRef, department, id, t);
            await this.updateDocument(vehicleRef, vehicle, id, t);
            await this.updateDocument(driverRef, driver, id, t);
            await this.updateDocument(reasonRef, reason, id, t);
            await this.updateDocument(desRef, destination, id, t);
            return Promise.resolve('transport succesully added');
          } catch (e) {
            console.log('trying catch');
            return Promise.reject(e);
          }
        })
        .catch(e => {
          console.log('then catch');
          console.log(e);
          return Promise.reject(e);
        });
    });
  }

  async updateDocument(
    dRef: DocumentReference,
    obj: Listing,
    transportId: string,
    transaction: firebase.firestore.Transaction
  ) {
    const totalTransports = obj.totalTransports + 1;
    const transports: string[] = obj.transports;
    transports.push(transportId);
    transaction.update(dRef, { totalTransports });
    transaction.update(dRef, { transports });
  }
}
