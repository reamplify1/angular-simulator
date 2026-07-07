import { NotificationService } from './../services/notification.service';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const notificationService: NotificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 500) {
        const errorMessage = `Ошибка сервера (${ error.status }). Пожалуйста, попробуйте позже.`;

        notificationService.showError(errorMessage);
      }
      return throwError(() => error as HttpErrorResponse);
    }),
  );
};
