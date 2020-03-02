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
  public loadingEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];

  public connectionStatusMessage: string;
  public connectionStatus: string;

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, `online`);
    this.offlineEvent = fromEvent(window, `offline`);
    this.loadingEvent = fromEvent(window, `loading`);

    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.snackBarPopper(`Connected to the internet! You are online`);
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.snackBarPopper(`Connected to the internet! You are online`);
      })
    );

    this.subscriptions.push(
      this.loadingEvent.subscribe(e => {
        this.snackBarPopper(`Please wait...`);
      })
    );
  }

  snackBarPopper(message: string) {
    this.snackBar.open(message, 'DISMISS');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
