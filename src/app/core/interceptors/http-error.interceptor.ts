import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../../shared/services/error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorSvc = inject(ErrorService);

  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        const message = err.error?.message || err.message || 'Unexpected HTTP error';
        const details = typeof err.error === 'string' ? err.error : JSON.stringify(err.error, null, 2);
        errorSvc.show({ title: `HTTP ${err.status}`, message, details });
      } else {
        errorSvc.show({ message: 'Unexpected error', details: String(err) });
      }
      return throwError(() => err);
    })
  );
};
