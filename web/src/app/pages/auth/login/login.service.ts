import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core';
import { LoginCredentials, LoginResponse } from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseHttpService {
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.post<LoginResponse>('auth/signin', credentials);
  }
}
