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
import { RegesterService } from './regester.service';
import { RegesterCredentials } from './types';
import { ToastService } from 'src/app/core';

@Component({
  selector: 'register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly router: Router = inject(Router);
  private readonly regesterService: RegesterService = inject(RegesterService);
  private readonly toastService: ToastService = inject(ToastService);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get formControl() {
    return this.form.controls;
  }

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  formData(): RegesterCredentials {
    return {
      name: this.form.value.name ?? '',
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    };
  }

  submit() {
    if (this.form.valid) {
      this.regesterService.regster(this.formData()).subscribe((respose) => {
        this.toastService.add('Successfuly regestered, please sign in');
        this.router.navigate(['authentication/login']);
      });
    }
  }
}
