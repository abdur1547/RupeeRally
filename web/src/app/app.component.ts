import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnackBarComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Modernize Angular Admin Template';
}
