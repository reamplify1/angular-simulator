import { inject, Injectable } from "@angular/core";
import { IPost } from "./interfaces/IPost";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPostsResponse } from "./interfaces/IPostsResponse";
import { IPostEditForm } from "./interfaces/IPostEditForm";
import { IPostEditRequest } from "./interfaces/IPostEditRequest";

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient)

  private readonly apiUrl: string = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostsResponse> {
    return this.http.get<IPostsResponse>(`${ this.apiUrl }?limit=${ limit }&skip=${ skip }`);
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.apiUrl }/${ id }`);
  }

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.apiUrl }/add`, post);
  }

  updatePost(id: number, editedPost: IPostEditRequest): Observable<IPost> {
    return this.http.put<IPost>(`${ this.apiUrl }/${ id }`, editedPost);
  }

  deletePost(id: number): Observable<{ isDeleted: boolean }> {
    return this.http.delete<{ isDeleted: boolean }>(`${ this.apiUrl }/${ id }`);
  }

}
