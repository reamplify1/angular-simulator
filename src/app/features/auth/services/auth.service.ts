import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { IToken } from '../interfaces/IToken';
import { IAuthUser } from '../interfaces/IAuthUser';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);

  private currentUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  currentUser$: Observable<IAuthUser | null> = this.currentUserSubject.asObservable();

  isAuthenticated$(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(credentials: ILoginRequest): Observable<IAuthUser> {
    return this.authApiService.login(credentials).pipe(
      switchMap((response: IAuthResponse) => {
        const authData: IToken = {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        };
      this.localStorageService.setItem("auth_data", authData);
      return this.authApiService.getCurrentUser();
      }),
      tap((user: IAuthUser) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  getProfile(): Observable<IAuthUser> {
    return this.authApiService.getCurrentUser().pipe(
      tap((user: IAuthUser) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error: HttpErrorResponse) => {
      this.currentUserSubject.next(null);
      return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  initAuth(): Observable<IAuthUser | null> {
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

  getAccessToken(): string | null {
    const authData: IToken | null = this.localStorageService.getItem<IToken>("auth_data");
    return authData ? authData.accessToken : null;
  }

  getRefreshToken(): string | null {
    const authData: IToken | null = this.localStorageService.getItem<IToken>("auth_data");
    return authData ? authData.refreshToken : null;
  }

  refreshToken(): Observable<IAuthResponse> {
    const refreshToken: string | null = this.getRefreshToken();
    if (!refreshToken) {
      this.notificationService.showError('Нужно войти в систему заново');
      return throwError(() => new Error('No refresh token available'));
    }

    return this.authApiService.refreshToken(refreshToken).pipe(
      tap((response: IAuthResponse) => {
        const authData: IToken = {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          };
        this.localStorageService.setItem('auth_data', authData);
      })
    )
  }

  logout(): void {
    this.localStorageService.removeItem("auth_data")
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
