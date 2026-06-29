import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { IAuthResponse } from './interfaces/IAuthResponse';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.getAccessToken();

  const addToken = (req: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  if (token) {
    const modifiedReq: HttpRequest<unknown> = addToken(req, token);
    return next(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((response: IAuthResponse) => {
              const retryReq: HttpRequest<unknown> = addToken(req, response.accessToken)
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
