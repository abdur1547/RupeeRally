import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const toastService: TokenService = inject(TokenService);
  return !toastService.isTokenExpired();
};
