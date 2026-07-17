import { LoaderService } from './../../services/loader.service';
import { NotificationService } from './../../services/notification.service';
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
  private notificationService: NotificationService = inject(NotificationService);
  private loaderService: LoaderService = inject(LoaderService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  readonly posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  private totalRecordsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly totalRecords$: Observable<number> = this.totalRecordsSubject.asObservable();

  loadPosts(rows: number, skip = 0): Observable<IPostsResponse> {
    this.loaderService.showLoader();
    return this.postApiService.getPosts(rows, skip).pipe(
      delay(2000),
      tap((res: IPostsResponse) => {
        this.postsSubject.next(res.posts);
        this.totalRecordsSubject.next(res.total);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      }),
    );
  }

  updatePost(id: number, updatedPost: IPostEditRequest): Observable<IPost> {
    return this.postApiService.updatePost(id, updatedPost).pipe(
      tap((savedPost: IPost) => {
        const currentPosts: IPost[] = this.postsSubject.getValue();

        const updatedList: IPost[] = currentPosts.map((post: IPost) => {
          return post.id === savedPost.id
            ? { ...post, ...savedPost, views: updatedPost.views as number }
            : post;
        });
        this.postsSubject.next(updatedList);
        this.notificationService.showSuccess('Пост успешно обновлен');
      }),
    );
  }

  deletePost(id: number): Observable<IPost> {
    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const currentPosts: IPost[] = this.postsSubject.getValue();
        this.postsSubject.next(currentPosts.filter((post: IPost) => post.id !== id));
        this.notificationService.showSuccess('Пост успешно удален');
      }),
    );
  }
}
