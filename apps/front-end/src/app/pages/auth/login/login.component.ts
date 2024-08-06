import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { Store } from '@ngxs/store';
import { Authenticate } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  showLogin = true;

  //Store
  private store = inject(Store);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(
        new Authenticate({
          email: email,
          password: password,
          mode: this.showLogin ? 'login' : 'register',
        })
      );
    }
  }

  toggleForm(): void {
    this.showLogin = !this.showLogin;
    if (this.showLogin) {
      this.loginForm.removeControl('confirmPassword');
      this.loginForm.clearValidators();
      this.loginForm.updateValueAndValidity();
    } else {
      this.loginForm.addControl(
        'confirmPassword',
        this.fb.control('', Validators.required)
      );
      this.loginForm.setValidators(passwordMatchValidator());
      this.loginForm.updateValueAndValidity();
    }
  }
}
