import { NotificationService } from '../services/notification.service';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export const errorInterceptor: HttpInterceptorFn = (

  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const notificationService: NotificationService = inject(NotificationService);
  const translateService: TranslateService = inject(TranslateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 500) {
        const errorMessage: string = translateService.instant('errors.server', {
          status: error.status,
        });

        notificationService.showError(errorMessage);
      }
      return throwError(() => error as HttpErrorResponse);
    }),
  );
  
};
