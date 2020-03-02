import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { FirebaseError } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  destination: Department;
  collectionName = 'departments';
  // set up display columns for this component
  displayedColumns = ['name', 'totalTransports', 'createdAt'];

  departments: Department[];

  constructor(
    public dialog: MatDialog,
    public contextService: DbcontextService,
    public snackBar: MatSnackBar
  ) {
    this.contextService.all<Department>(this.collectionName).subscribe(d => {
      this.departments = d;
    });
  }

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { title: 'Department', name: '' }
    });

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.destination = new Department('', form.name);
        this.contextService.save<Department>(
          this.destination,
          this.collectionName
        );
      }
    });
  }
}
