// src/app/shared/services/error.service.ts
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { AppError } from '../models/app-error';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private dialog = inject(MatDialog);

  show(error: AppError | string) {
    const payload: AppError = typeof error === 'string' ? { message: error } : error;
    this.dialog.open(ErrorDialogComponent, 
      { 
        data: payload,
        panelClass: 'error-dialog',
        width: '560px',              
        maxWidth: '90vw', });
  }
}
