import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DbcontextService {
  constructor(
    public db: AngularFirestore,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  get<T>(id: string, collectionName: string) {
    console.log('get', id, collectionName);
    return this.db
      .collection(`${collectionName}`)
      .doc<T>(`${id}`)
      .valueChanges();
  }

  save<T>(object: T, collectionName: string) {
    this.db
      .collection<T>(collectionName)
      .add({ ...object })
      .then(d => {
        this.snackBar.open(
          `${collectionName.replace('s', '')} has been saved.`,
          'DISMISS',
          {
            duration: 3000
          }
        );
      })
      .catch(e => {
        this.snackBar.open(e, 'DISMISS');
      });
  }

  all<T>(collectionName: string) {
    return this.db.collection<T>(collectionName).valueChanges();
  }

  async list<T>(collectionName: string) {
    return this.db
      .collection<T>(collectionName)
      .get()
      .pipe(
        map(d =>
          d.docs.map(x => {
            const data: any = { ...x.data() };
            data.id = x.id;
            return data as T;
          })
        )
      )
      .toPromise();
  }
}
