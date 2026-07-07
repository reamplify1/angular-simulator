import { PostService } from './post.service';
import { catchError, EMPTY, finalize, Observable, switchMap, take, throwError } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { IPost } from './interfaces/IPost';
import { TableModule, TablePageEvent } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PostEditDialogComponent } from './post-edit-dialog/post-edit-dialog.component';
import { ContextMenuModule } from 'primeng/contextmenu'; // Импортируем модуль меню
import { MenuItem } from 'primeng/api';
import { IPostEditRequest } from './interfaces/IPostEditRequest';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationService } from '../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  imports: [
    TableModule,
    ContextMenuModule,
    RouterLink,
    AsyncPipe,
    SkeletonModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService],
})
export class PostsComponent implements OnInit {
  private router: Router = inject(Router);
  private postService: PostService = inject(PostService);
  private dialogService: DialogService = inject(DialogService);
  private notificationService: NotificationService = inject(NotificationService);

  posts$: Observable<IPost[]> = this.postService.posts$;
  totalRecords$: Observable<number> = this.postService.totalRecords$;

  isLoading = false;
  rows = 10;
  first = 0;
  selectedPost!: IPost;
  contextMenuItems: MenuItem[] = [];
  skeletonRows: IPost[] = Array(16).fill({}) as IPost[];

  ngOnInit(): void {
    this.loadPosts(this.rows, 0);
    this.initContextMenu();
  }

  loadPosts(rows: number, skip = 0): void {
    this.isLoading = true;
    this.postService
      .loadPosts(rows, skip)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe();
  }

  private initContextMenu(): void {
    this.contextMenuItems = [
      {
        label: 'Просмотреть',
        icon: 'pi pi-fw pi-eye',
        command: () => this.onViewPost(this.selectedPost!.id),
      },
      {
        label: 'Редактировать',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.editPost(this.selectedPost),
      },
      {
        label: 'Удалить',
        icon: 'pi pi-fw pi-trash',
        styleClass: 'text-red-500',
        command: () => this.deletePost(this.selectedPost?.id),
      },
    ];
  }

  onViewPost(id: number): void {
    this.router.navigate(['/posts', id]);
  }

  onDoubleClickTableRow(id: number): void {
    this.router.navigate(['/posts', id]);
  }

  updatePost(id: number, updatedPost: IPostEditRequest): Observable<IPost> {
    return this.postService.updatePost(id, updatedPost).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError('Не удалось обновить пост');
        return throwError(() => error);
      }),
    );
  }

  editPost(post: IPost | null): void {
    if (!post) return;

    const postId: number = post.id;

    const ref: DynamicDialogRef<PostEditDialogComponent> | null = this.dialogService.open(
      PostEditDialogComponent,
      {
        data: { post },
        header: 'Редактировать пост',
        width: '700px',
        closable: true,
        dismissableMask: true,
      },
    );

    if (!ref) return;

    ref.onClose
      .pipe(
        take(1),
        switchMap((result: IPostEditRequest | null) => {
          if (!result) {
            return EMPTY;
          }

          return this.updatePost(postId, result).pipe(
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showError('Не удалось обновить пост');
              return throwError(() => error);
            }),
          );
        }),
      )
      .subscribe();
  }

  deletePost(id: number): void {
    this.postService
      .deletePost(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError('Не удалось удалить пост');
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  onPageChange(event: TablePageEvent): void {
    this.rows = event.rows;
    this.first = event.first;
    this.loadPosts(this.rows, this.first);
  }
}
