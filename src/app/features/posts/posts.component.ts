import { BehaviorSubject, delay, finalize, tap } from 'rxjs';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PostApiService } from './post-api.service';
import { IPost } from './interfaces/IPost';
import { TableModule, TablePageEvent } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PostEditDialogComponent } from './post-edit-dialog/post-edit-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContextMenuModule } from 'primeng/contextmenu'; // Импортируем модуль меню
import { MenuItem } from 'primeng/api';
import { IPostsResponse } from './interfaces/IPostsResponse';
import { IPostEditFormValue } from './interfaces/IPostEditFormValue';

@Component({
  selector: 'app-posts',
  imports: [TableModule, ContextMenuModule, RouterLink, AsyncPipe, SkeletonModule, PostEditDialogComponent, DialogModule, InputTextModule, InputNumberModule, ButtonModule, RouterOutlet],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  private router: Router = inject(Router);
  private postService: PostApiService = inject(PostApiService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  posts$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);

  rows: number = 10;
  totalRecords: number = 0;
  isLoading: boolean = true;
  isDialogComponentOpen: boolean = false;
  selectedPost: IPost | null = null;
  contextMenuItems: MenuItem[] = [];
  skeletonRows: IPost[] = Array(16).fill({}) as IPost[];

  ngOnInit(): void {
    this.loadPosts();
    this.initContextMenu();
  }

  get isPostsUrl(): boolean {
    return this.router.url === '/posts';
  }

  private loadPosts(skip: number = 0): void {
    this.isLoading = true;

    this.postService.getPosts(this.rows, skip).pipe(
      delay(2000),
      tap((res: IPostsResponse) => {
        this.posts$.next(res.posts);
        this.totalRecords = res.total;
      }),
      finalize(() => this.isLoading = false),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private initContextMenu(): void {
    this.contextMenuItems = [
      {
        label: 'Просмотреть',
        icon: 'pi pi-fw pi-eye',
        command: () => this.onViewPost(this.selectedPost?.id)
      },
      {
        label: 'Редактировать',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.onEditPost(this.selectedPost)
      },
      {
        label: 'Удалить',
        icon: 'pi pi-fw pi-trash',
        styleClass: 'text-red-500',
        command: () => this.onDelete(this.selectedPost?.id)
      }
    ];
  }

  onViewPost(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/posts', id]);
    }
  }

  onDoubleClick(id: number): void {
    this.router.navigate(['/posts', id]);
  }

  onSavePost(updatedPost: IPostEditFormValue): void {
    if (this.selectedPost && this.selectedPost.id) {
      const id: number = this.selectedPost.id;
      this.postService.updatePost(id, updatedPost).pipe(
        tap((savedPost) => {
          const currentPosts: IPost[] = this.posts$.getValue();
          const updatedList: IPost[] = currentPosts.map(p => p.id === savedPost.id ? savedPost : p);
          this.posts$.next(updatedList);
        }),
        finalize(() => this.isDialogComponentOpen = false),
      ).subscribe();
    }
  }

  onEditPost(post: IPost | null): void {
    this.selectedPost = post;
    this.isDialogComponentOpen = true;
  }

  onDelete(id: number | undefined): void {
    if (!id) return;

    this.postService.deletePost(id).pipe(
      tap(() => {
        const currentPosts: IPost[] = this.posts$.getValue();
        this.posts$.next(currentPosts.filter(post => post.id !== id));
      }),
    ).subscribe();
  }

  onPageChange(event: TablePageEvent): void {
    this.rows = event.rows;

    const skip: number = event.first;

    this.loadPosts(skip);
  }

}
