import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TransportComponent } from './admin/transports/transport/transport.component';
import { DepartmentComponent } from './admin/department/department.component';
import { VehicleComponent } from './admin/vehicle/vehicle.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AddDialogComponent } from './admin/add-dialog/add-dialog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ListComponent } from './admin/list/list.component';
import { DestinationComponent } from './admin/destination/destination.component';
import { DriversComponent } from './admin/driver/drivers.component';
import { AddTransportComponent } from './admin/transports/add-transport/add-transport.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { TransportListComponent } from './admin/transports/transport-list/transport-list.component';
import { TransportsComponent } from './admin/transport-reference/transports/transports.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  OwlDateTimeModule,
  OWL_DATE_TIME_FORMATS,
  DateTimeAdapter,
  OWL_DATE_TIME_LOCALE
} from 'ng-pick-datetime';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import {
  OwlMomentDateTimeModule,
  MomentDateTimeAdapter
} from 'ng-pick-datetime-moment';
import { VehicleCardComponent } from './admin/graphs/vehicle-card/vehicle-card.component';

export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'dd MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'dd MMMM YYYY'
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    TransportComponent,
    DepartmentComponent,
    VehicleComponent,
    AddDialogComponent,
    DestinationComponent,
    DriversComponent,
    ListComponent,
    TransportListComponent,
    AddTransportComponent,
    TransportsComponent,
    VehicleCardComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatRadioModule,
    OwlDateTimeModule,
    // OwlMomentDateTimeModule,
    NgxChartsModule,
    Ng2FlatpickrModule
  ],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE]
    },
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: MY_MOMENT_FORMATS
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddDialogComponent, AddTransportComponent]
})
export class AppModule {}
