import { inject, Injectable } from "@angular/core";
import { IPost } from "./interfaces/IPost";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { IPostsResponse } from "./interfaces/IPostsResponse";
import { IPostCreateForm } from "./interfaces/IPostCreateForm";
import { IPostEditFormValue } from "./interfaces/IPostEditFormValue";

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient)

  private readonly apiUrl: string = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostsResponse> {
    return this.http.get<IPostsResponse>(
      `${ this.apiUrl }?limit=${ limit }&skip=${ skip }`
    );
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.apiUrl }/${ id }`);
  }

  createPost(post: IPostCreateForm): Observable<IPost> {
    return this.http.post<IPost>(`${ this.apiUrl }/add`, post);
  }

  updatePost(id: number, changes: IPostEditFormValue): Observable<IPost> {
    return this.http.put<IPost>(`${ this.apiUrl }/${ id }`, changes);
  }

  deletePost(id: number): Observable<{ isDeleted: boolean }> {
    return this.http.delete<{ isDeleted: boolean }>(`${ this.apiUrl }/${ id }`);
  }

}
