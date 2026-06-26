import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuth } from '../interfaces/IAuth';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  login(credentials: ILoginRequest): Observable<IAuth> {
    return this.authApiService.loginUser(credentials).pipe(
      tap((response: IAuth)=> {
        this.localStorageService.setItem("token", response.accessToken);
        this.localStorageService.setItem("refresh-token", response.refreshToken);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  isLoggedIn(): boolean {
    const token: string | null = this.localStorageService.getItem<string>("token");
    return !!token;
  }

  getToken(): string | null {
    return this.localStorageService.getItem<string>("token");
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem<string>("refresh-token");
  }

  refreshToken(): Observable<IAuth> {
    const refreshToken: string | null = this.getRefreshToken();
    if (!refreshToken) {
      this.notificationService.showError('Нужно войти в систему заново');
      return throwError(() => new Error('No refresh token available'));
    }

    return this.authApiService.refreshUserToken(refreshToken).pipe(
      tap((response: IAuth) => {
        this.localStorageService.setItem('token', response.accessToken);
        this.localStorageService.setItem('refresh-token', response.refreshToken);
      })
    )
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refresh-token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

}
