import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { IAuthResponse } from './interfaces/IAuthResponse';

let isRefreshing: boolean = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const accessToken: string | null = authService.getAccessToken();

  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const addToken = (req: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
    return req.clone({


    });
  };

  const request: HttpRequest<unknown> = accessToken ? addToken(req, accessToken) : req;

  return next(request).pipe(

    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }
      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter((token: string | null) => token !== null),
          take(1),
          switchMap((token: string) => {
            const retryRequest: HttpRequest<unknown> = addToken(req, token);
            return next(retryRequest);
          })
        );

      }
      isRefreshing = true;
      refreshTokenSubject.next(null);
      return authService.refreshToken().pipe(

        switchMap((response: IAuthResponse) => {
          refreshTokenSubject.next(response.accessToken);
          const retryRequest = addToken(req, response.accessToken);
          return next(retryRequest);
        }),

        catchError((refreshError: HttpErrorResponse) => {
          authService.logout();
          return throwError(() => refreshError);
        }),

        finalize(() => {
          isRefreshing = false;
        })
      );
    })
  )
};
