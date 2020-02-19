import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DbcontextService } from 'src/app/services/dbcontext.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  message = '';
  public addForm: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: DbcontextService
  ) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ])
    });
  }

  public hasError(controlName: string, errorName: string) {
    return this.addForm.controls[controlName].hasError(errorName);
  }

  public Add() {
    this.dialogRef.close(this.addForm.value);
  }
}
