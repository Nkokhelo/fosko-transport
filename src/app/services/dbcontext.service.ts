import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbcontextService {
  constructor(public db: AngularFirestore, public snackBar: MatSnackBar) {}

  get<T>(id: string, collectionName: string) {
    return this.db
      .collection(`${collectionName}`)
      .doc<T>(`${id}`)
      .get();
  }

  save<T>(object: T, collectionName: string) {
    this.db
      .collection<T>(collectionName)
      .add({ ...object })
      .then(d => {
        this.snackBar.open(`Saved!!!`);
      })
      .catch(e => {
        this.snackBar.open(e);
      });
  }

  all<T>(collectionName: string) {
    return this.db.collection<T>(collectionName).valueChanges();
  }
}
