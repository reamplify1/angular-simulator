import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuth } from '../interfaces/IAuth';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { ICurrentUser } from '../interfaces/ICurrentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private http: HttpClient = inject(HttpClient);
  private url: string = 'https://dummyjson.com/auth/';

  login(credentials: ILoginRequest): Observable<IAuth> {
    return this.http.post<IAuth>(`${ this.url }login`, credentials);
  }

  refreshToken(refreshToken: string): Observable<IAuth> {
    return this.http.post<IAuth>(`${ this.url }refresh`, { refreshToken });
  }

  getCurrentUser(): Observable<ICurrentUser> {
    return this.http.get<ICurrentUser>(`${ this.url }/me`);
  }

}
