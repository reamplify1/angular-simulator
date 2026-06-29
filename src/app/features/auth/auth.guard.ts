import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map, take } from 'rxjs';
import { IAuthUser } from './interfaces/IAuthUser';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map((user: IAuthUser | null) => {
      if (user) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  )
};
