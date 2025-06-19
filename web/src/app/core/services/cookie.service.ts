import { Injectable } from '@angular/core';

export interface CookieOptions {
  path?: string;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
  maxAge?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  set(name: string, value: string, options: CookieOptions = {}): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}`;

    if (options.path) {
      cookieString += `; Path=${options.path}`;
    }
    if (options.secure) {
      cookieString += `; Secure`;
    }
    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }
    if (options.maxAge) {
      cookieString += `; Max-Age=${options.maxAge}`;
    }

    document.cookie = cookieString;
  }

  get(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)')
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  delete(
    name: string,
    path = '/',
    secure = false,
    sameSite: 'Lax' | 'Strict' | 'None' = 'Lax'
  ): void {
    this.set(name, '', {
      path,
      sameSite,
      secure,
      maxAge: 0,
    });
  }
}
