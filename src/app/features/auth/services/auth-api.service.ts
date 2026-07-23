import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuthUser } from '../interfaces/IAuthUser';
import { APP_CONFIG } from '../../../tokens/app-config.token';
import { IAppConfig } from '../../../interfaces/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http: HttpClient = inject(HttpClient);
  private url: string = 'https://dummyjson.com/auth/';
  private readonly appConfig: IAppConfig = inject(APP_CONFIG);

  login(credentials: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(
      `${ this.url }login`,
      {
        ...credentials,
        expiresInMins: this.appConfig.sessionTimeout
      });
  }

  refreshToken(refreshToken: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(
      `${ this.url }refresh`,
      {
        refreshToken,
        expiresInMins: this.appConfig.sessionTimeout
      });
  }

  getCurrentUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${this.url}/me`);
  }
}
