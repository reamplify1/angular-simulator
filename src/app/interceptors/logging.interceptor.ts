import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = performance.now();
  const { method, url } = req;

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
        const duration = (performance.now() - startTime).toFixed(2);
        console.log(`[HTTP Success] ${ method}  ${ url } - Status: ${ event.status } (${ duration }ms)`);
        }
      },
      error: (error: HttpErrorResponse) => {
        const duration: string = (performance.now() - startTime).toFixed(2);
        console.error(`[HTTP Error] ${ method } ${ url } - Status: ${ error.status } (${ duration }ms)`);
      }
    })
  )
}
