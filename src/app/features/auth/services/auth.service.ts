import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { IToken } from '../interfaces/IToken';
import { IAuthUser } from '../interfaces/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly authApiService: AuthApiService = inject(AuthApiService);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly router: Router = inject(Router);

  private currentUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  readonly currentUser$: Observable<IAuthUser | null> = this.currentUserSubject.asObservable();

  readonly isAuthenticated$: Observable<boolean> = this.currentUser$.pipe(
    map(user => user !== null)
  );

  initAuth(): Observable<IAuthUser | null> {
    if (this.getAccessToken()) {
      return this.getProfile().pipe(
        catchError(() => {
          this.clearAuthData();
          return of(null);
        })
      );
    }
    return of(null);
  }

  login(credentials: ILoginRequest): Observable<IAuthUser> {
    return this.authApiService.login(credentials).pipe(
      tap((response: IAuthResponse) => this.saveTokens(response)),
      switchMap(() => this.getProfile())
    );
  }

  private saveTokens(response: IAuthResponse): void {
    const authData: IToken = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
    };
    this.localStorageService.setItem("auth_data", authData);
  }

  getProfile(): Observable<IAuthUser> {
    return this.authApiService.getCurrentUser().pipe(
      tap((user: IAuthUser) => {
        this.currentUserSubject.next(user);
      })
    );
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
      return throwError(() => new Error('No refresh token available'));
    }

    return this.authApiService.refreshToken(refreshToken).pipe(
      tap((response: IAuthResponse) => this.saveTokens(response))
    );
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private clearAuthData(): void {
    this.localStorageService.removeItem('auth_data');
    this.currentUserSubject.next(null);
  }

}
