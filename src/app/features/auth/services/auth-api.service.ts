import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuthUser } from '../interfaces/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http: HttpClient = inject(HttpClient);
  private url = 'https://dummyjson.com/auth/';

  login(credentials: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.url}login`, credentials);
  }

  refreshToken(refreshToken: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.url}refresh`, { refreshToken });
  }

  getCurrentUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${this.url}/me`);
  }
}
