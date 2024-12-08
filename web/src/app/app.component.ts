import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent, ToolbarComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Modernize Angular Admin Template';
}
