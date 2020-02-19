import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  user: User = { email: '', password: '', isAdmin: false };
  isLoading = false;
  message = '';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(6)
      ])
    });
    console.log(this.loginForm.controls);
  }

  async onLogin() {
    this.isLoading = true;
    try {
      this.user = this.loginForm.value;
      const result = await this.authService.login(this.user);
      console.log(result);
    } catch (e) {
      console.log(e);
      this.isLoading = false;
      if (e.code === 'auth/user-not-found') {
        this.message = 'Username or Password is incorrect';
      } else {
        this.message = e.message;
      }
    }
  }

  public hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
