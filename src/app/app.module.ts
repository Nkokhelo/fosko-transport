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
import { DepartmentsListComponent } from './admin/departments/departments-list/departments-list.component';
import { DriversListComponent } from './admin/drivers/drivers-list/drivers-list.component';
import { VehiclesListComponent } from './admin/vehicles/vehicles-list/vehicles-list.component';
import { DestinationsListComponent } from './admin/destinations/destinations-list/destinations-list.component';
import { DestinationAddComponent } from './admin/destinations/destination-add/destination-add.component';
import { DriversComponent } from './admin/drivers/drivers/drivers.component';
import { DestinationComponent } from './admin/destinations/destination/destination.component';
import { DepartmentComponent } from './admin/departments/department/department.component';
import { VehicleComponent } from './admin/vehicles/vehicle/vehicle.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MatProgressBarModule,
  MatSnackBar,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AddDialogComponent } from './admin/add-dialog/add-dialog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    TransportComponent,
    DepartmentsListComponent,
    DriversListComponent,
    VehiclesListComponent,
    DestinationsListComponent,
    DestinationAddComponent,
    DriversComponent,
    DestinationComponent,
    DepartmentComponent,
    VehicleComponent,
    AddDialogComponent
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
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddDialogComponent]
})
export class AppModule {}
