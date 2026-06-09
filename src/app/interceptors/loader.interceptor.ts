import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loaderService: LoaderService = inject(LoaderService);

  loaderService.showLoader();

  return next(req).pipe(
    finalize(() => {
      loaderService.hideLoader();
    })
  );
};
