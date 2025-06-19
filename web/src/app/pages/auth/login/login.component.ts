import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { TokenService } from '../../../core/services/token.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private loginService: LoginService = inject(LoginService);
  private tokenService: TokenService = inject(TokenService);
  private router: Router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    this.loginService.login(this.loginForm.value).subscribe((tokens) => {
      this.tokenService.saveAccessTokens(tokens.data.access_token);
      this.tokenService.saveRefreshTokens(tokens.data.refresh_token);
      this.router.navigate(['/']);
    });
  }

  getTokens() {
    console.log(this.tokenService.getAccessToken());
  }

  clearTokens() {
    console.log(this.tokenService.clearTokens());
  }
}
