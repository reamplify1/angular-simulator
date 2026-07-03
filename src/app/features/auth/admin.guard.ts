import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IAuthUser } from './interfaces/IAuthUser';
import { NotificationService } from '../../services/notification.service';

export const adminGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const notificationService: NotificationService = inject(NotificationService);
  const currentUser: IAuthUser | null = authService.getCurrentUser();

  if (currentUser?.role === 'admin') {
    return true;
  }

  notificationService.showError('Access denied. Administrator role is required.');
  return router.createUrlTree(['/']);

};
