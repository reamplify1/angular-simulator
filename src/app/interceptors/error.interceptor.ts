import { NotificationService } from './../services/notification.service';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const notificationService: NotificationService = inject(NotificationService)

return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      const isHandledLocally: boolean = error.status === 400 || error.status === 401;

      if (!isHandledLocally) {
        let errorMessage: string = 'Произошла непредвиденная ошибка на сервере.';

        if (error.status >= 500) {
          errorMessage = `Ошибка сервера (${ error.status }). Пожалуйста, попробуйте позже.`;
        } else if (error.status === 0) {
          errorMessage = 'Сеть недоступна. Проверьте интернет-соединение.';
          } else if (error.status === 404) {
          errorMessage = 'Запрашиваемый ресурс не найден (404).';
        } else if (error.message) {
          errorMessage = `Произошла ошибка (Код: ${ error.status }).`;
        }

        notificationService.showError(errorMessage);
      }
      return throwError(() => error as HttpErrorResponse);
    })
  );
};
