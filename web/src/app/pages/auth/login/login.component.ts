import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './login.service';
import { LoginCredentials } from './types';
import { TokenService } from 'src/app/core';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly router: Router = inject(Router);
  private readonly loginService: LoginService = inject(LoginService);
  private readonly tokenService: TokenService = inject(TokenService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get formControl() {
    return this.form.controls;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.email;
  }

  formData(): LoginCredentials {
    return {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    };
  }

  submit() {
    if (this.form.valid) {
      this.loginService.login(this.formData()).subscribe((response) => {
        this.tokenService.saveRefreshTokens(response.data.refresh_token);
        this.tokenService.saveAccessTokens(response.data.access_token);
        this.router.navigate(['/']);
      });
    }
  }
}
