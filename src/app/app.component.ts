import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'foskor-transport';

  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];

  public connectionStatusMessage: string;
  public connectionStatus: string;

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.offlineEvent = fromEvent(window, 'loading');

    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.connectionStatus = 'Connected to the internet! You are online';
        this.snackBar.open(
          'Connected to the internet! You are online',
          'DISMISS'
        );
        console.log('online');
        this.connectionStatus = 'online';
      })
    );
    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.connectionStatus = 'Connection lost, your are offline';
        this.snackBar.open(
          'Connected to the internet! You are online',
          'DISMISS'
        );
        this.connectionStatus = 'online';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
