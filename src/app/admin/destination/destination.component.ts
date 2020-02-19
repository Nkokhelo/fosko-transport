import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Destination } from 'src/app/models/destination';
import { MatDialog } from '@angular/material';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit, OnDestroy {
  destination: Destination;
  collectionName = 'destinations';
  // set up display columns for this component
  displayedColumns = ['name', 'totalTransports', 'createdAt'];
  subscription: Subscription;

  destinations: Destination[];

  constructor(
    public dialog: MatDialog,
    public contextService: DbcontextService,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.contextService
      .all<Destination>(this.collectionName)
      .subscribe(d => {
        this.destinations = d;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { title: 'Destination', name: '' }
    });

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.destination = new Destination('', form.name);
        this.contextService.save<Destination>(
          this.destination,
          this.collectionName
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
