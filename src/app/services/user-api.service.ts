import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
