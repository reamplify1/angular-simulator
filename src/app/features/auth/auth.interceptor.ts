import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { IAuth } from './interfaces/IAuth';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.getToken();

  if (token) {
    const modifiedReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });

    return next(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((response: IAuth) => {
              const retryReq: HttpRequest<unknown> = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`
                }
              });
              return next(retryReq);
            }),

            catchError((refreshError: HttpErrorResponse) => {
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }

  return next(req);
};
