import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated: boolean) => {
      return isAuthenticated ? true : router.createUrlTree(['/login']);
    }),
  );
};
