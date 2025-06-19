import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'default-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {}
