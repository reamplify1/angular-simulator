import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuth } from '../interfaces/IAuth';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { IAuthSession } from '../interfaces/IAuthSession';
import { ICurrentUser } from '../interfaces/ICurrentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);

  private currentUserSubject: BehaviorSubject<ICurrentUser | null> = new BehaviorSubject<ICurrentUser | null>(null);
  currentUser$: Observable<ICurrentUser | null> = this.currentUserSubject.asObservable();

  isAuthenticated$: Observable<boolean> = this.currentUser$.pipe(
    map(user => !!user)
  );

  login(credentials: ILoginRequest): Observable<ICurrentUser> {
    return this.authApiService.login(credentials).pipe(
      switchMap((response: IAuth) => {
        const authData: IAuthSession = {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
      };
      this.localStorageService.setItem("auth_data", JSON.stringify(authData));
      return this.authApiService.getCurrentUser();
      }),
      tap((user: ICurrentUser) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  getProfile(): Observable<ICurrentUser> {
    return this.authApiService.getCurrentUser().pipe(
      tap((user: ICurrentUser) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  initAuth(): Observable<ICurrentUser | null> {
    if (this.isLoggedIn()) {
      return this.getProfile().pipe(
        catchError(() => {
          this.localStorageService.removeItem("auth_data");
          return of(null);
        })
      );
    }
    return of(null);
  }

  getToken(): string | null {
    const data: string | null = this.localStorageService.getItem<string>("auth_data");
    if (!data) return null;
    const authData = JSON.parse(data);
    return authData.accessToken;
  }

  getRefreshToken(): string | null {
    const data: string | null = this.localStorageService.getItem<string>("auth_data");
    if (!data) return null;
    const authData: IAuthSession = JSON.parse(data);
    return authData.refreshToken;
  }

  refreshToken(): Observable<IAuth> {
    const refreshToken: string | null = this.getRefreshToken();
    if (!refreshToken) {
      this.notificationService.showError('Нужно войти в систему заново');
      return throwError(() => new Error('No refresh token available'));
    }

    return this.authApiService.refreshToken(refreshToken).pipe(
      tap((response: IAuth) => {
        const authData: IAuthSession = {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          };
        this.localStorageService.setItem('auth_data', JSON.stringify(authData));
      })
    )
  }

  logout(): void {
    this.localStorageService.removeItem("auth_data")
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
