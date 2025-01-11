import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from 'src/app/core';

@Component({
  selector: 'snack-bar',
  standalone: true,
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private toastService = inject(ToastService);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.toastService.toasts$.subscribe((toasts) => {
      if (toasts.length) {
        const toast = toasts[0];
        this.openSnackBar(toast.message, 'Close');
      }
    });
  }
}
