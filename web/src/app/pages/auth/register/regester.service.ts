import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core';
import { RegesterCredentials, RegesterResponse } from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegesterService extends BaseHttpService {
  regster(credentials: RegesterCredentials): Observable<RegesterResponse> {
    return this.post<RegesterResponse>('auth/signup', credentials);
  }
}
