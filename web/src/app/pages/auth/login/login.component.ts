import { Component } from '@angular/core';
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
  constructor(private router: Router) { }

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

  submit() {
    this.email.errors;
    console.log(this.form.value, this.form.controls.email.errors);
    // this.router.navigate(['/']);
  }
}
