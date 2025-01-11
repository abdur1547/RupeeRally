import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SnackBarComponent } from './shared';
import { TokenService } from './core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly router: Router = inject(Router);
  private readonly tokenService: TokenService = inject(TokenService);
  title = 'RupeeRally';

  ngOnInit() {
    this.checkToken();
    this.tokenService.autoRefreshAccessToken();
  }

  ngOnDestroy() {
    this.tokenService.clearTimer();
  }

  checkToken() {
    if (!this.tokenService.getAccessToken()) {
      this.router.navigate(['authentication/login']);
    }
  }
}
