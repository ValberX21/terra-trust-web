// src/app/shared/components/error-dialog/error-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AppError } from '../../models/app-error';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  styleUrls: ['./error-dialog.component.css'],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
  <h2 mat-dialog-title>{{ data.title || 'Something went wrong' }}</h2>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
      <pre *ngIf="data.details">{{ data.details }}</pre>
    </div>

    <div mat-dialog-actions>
      <button mat-button (click)="close()">OK</button>
    </div>
  `
})

export class ErrorDialogComponent {
  constructor(
    private ref: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppError
  ) {}
  close() { this.ref.close(); }
}
