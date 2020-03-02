import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Transport } from 'src/app/models/transports';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { AddDialogComponent } from '../../add-dialog/add-dialog.component';
import { AddTransportComponent } from '../add-transport/add-transport.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent {}
