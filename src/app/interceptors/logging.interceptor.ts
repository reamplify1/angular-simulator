import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { tap } from 'rxjs';
import { IRequestInfo } from '../interfaces/IRequestInfo';
import { APP_CONFIG } from '../tokens/app-config.token';
import { inject } from '@angular/core';
import { IAppConfig } from '../interfaces/IAppConfig';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const startTime: number = performance.now();
  const { method, url }: IRequestInfo = req;
  const appConfig: IAppConfig = inject(APP_CONFIG);

  if (!appConfig.enableLogs) {
    return next(req);
  }

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          const duration: string = (performance.now() - startTime).toFixed(2);
          console.log(`[HTTP Success] ${ method }  ${ url } - Status: ${ event.status } (${ duration }ms)`);
        }
      },
      error: (error: HttpErrorResponse) => {
        const duration: string = (performance.now() - startTime).toFixed(2);
        console.error(`[HTTP Error] ${ method } ${ url } - Status: ${ error.status } (${ duration }ms)`);
      },
    }),
  );
};
