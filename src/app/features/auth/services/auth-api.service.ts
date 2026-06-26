import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuth } from '../interfaces/IAuth';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../interfaces/ILoginRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private http: HttpClient = inject(HttpClient);

  loginUser(credentials: ILoginRequest): Observable<IAuth> {
    return this.http.post<IAuth>('https://dummyjson.com/auth/login', credentials);
  }

  refreshUserToken(refreshToken: string): Observable<IAuth> {
    return this.http.post<IAuth>('https://dummyjson.com/auth/refresh', { refreshToken });
  }

}
