import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { BehaviorSubject, delay, finalize, Observable, tap } from 'rxjs';
import { IPost } from './interfaces/IPost';
import { IPostEditRequest } from './interfaces/IPostEditRequest';
import { IPostsResponse } from './interfaces/IPostsResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private postApiService: PostApiService = inject(PostApiService);

  private  postsSubject : BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  readonly posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();
  private totalRecordsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly totalRecords$: Observable<number> =  this.totalRecordsSubject.asObservable();

  loadPosts(rows: number, skip: number = 0): Observable<IPostsResponse>{
    this.loadingSubject.next(true);
    return this.postApiService.getPosts(rows, skip).pipe(
      delay(2000),
      tap((res: IPostsResponse) => {
        this.postsSubject.next(res.posts);
        this.totalRecordsSubject.next(res.total);
      }),
      finalize(() => this.loadingSubject.next(false)),
    )
  }

  updatePost(id: number, updatedPost: IPostEditRequest): Observable<IPost> {
    return this.postApiService.updatePost(id, updatedPost).pipe(
      tap((savedPost: IPost) => {
        const currentPosts: IPost[] = this.postsSubject.getValue();

        const updatedList: IPost[] = currentPosts.map(post => {
          if (post.id === savedPost.id) {
            return { ...post, ...savedPost, views: updatedPost.views};
          }

          return post;
        });

        this.postsSubject.next(updatedList);
      })
    )
  }

  deletePost(id: number): Observable<{ isDeleted: boolean }> {
    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const currentPosts: IPost[] = this.postsSubject.getValue();
        this.postsSubject.next(currentPosts.filter(post => post.id !== id));
      }),
    )
  }

}
