import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../components/error-dialog/success-dialog.component';
import { SuccessData } from '../models/app-success';

@Injectable({ providedIn: 'root' })
export class SuccessService {
  private dialog = inject(MatDialog);

  show(data: SuccessData | string) {
    const payload: SuccessData = typeof data === 'string' ? { message: data } : data;

    this.dialog.open(SuccessDialogComponent, {
      data: payload,
      panelClass: 'success-dialog',
      width: '560px',
      maxWidth: '90vw'
    });
  }
}
