import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TransportComponent } from './admin/transports/transport/transport.component';
import { DestinationComponent } from './admin/destination/destination.component';
import { DepartmentComponent } from './admin/department/department.component';
import { VehicleComponent } from './admin/vehicle/vehicle.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { DriversComponent } from './admin/driver/drivers.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'departments',
        component: DepartmentComponent
      },
      {
        path: 'destinations',
        component: DestinationComponent
      },
      {
        path: 'drivers',
        component: DriversComponent
      },
      {
        path: 'transports',
        component: TransportComponent
      },
      {
        path: 'vehicles',
        component: VehicleComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
