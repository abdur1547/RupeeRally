import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupService } from './signup.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../core';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private signupService: SignupService = inject(SignupService);
  private tokenService: TokenService = inject(TokenService);
  private router: Router = inject(Router);

  signupForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    name: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  signup() {
    console.log(this.signupForm.valid, this.signupForm.errors);
    // this.signupService.signup(this.signupForm.value).subscribe((tokens) => {
    //   this.tokenService.saveAccessTokens(tokens.data.access_token);
    //   this.tokenService.saveRefreshTokens(tokens.data.refresh_token);
    //   this.router.navigate(['/']);
    // });
  }
}
