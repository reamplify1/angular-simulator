import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostApiService } from '../post-api.service';
import { finalize, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { IPost } from '../interfaces/IPost';
import { IPostCreateForm } from '../interfaces/IPostCreateForm';
import { IPostFormValue } from '../interfaces/IPostFormValue';


@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule, RouterLink],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private postApi: PostApiService = inject(PostApiService);
  private router: Router = inject(Router);

  isSubmitting: boolean = false;

  // не могу понять что делать с формой, как типизировать и нужен ли мне IPostForm и IPostFormValue для этого, хотел через дженерик - не получается. Можно ли так форму оставить?
  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    userId: [1, [Validators.required]],
    tags: ['', [Validators.required]],
    views: [0],
    reactions: this.fb.group({
      likes: [0],
      dislikes: [0]
    })
  });

  onSubmit(): void {
    if (this.postForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;

    const formValue: IPostFormValue = this.postForm.value;

    const tagsArray: string[] = formValue.tags ? formValue.tags.split(',').map((t: string) => t.trim()) : [];

    const newPost: IPostCreateForm = {
      title: formValue.title,
      body: formValue.body,
      userId: Number(formValue.userId),
      tags: tagsArray,
      views: Number(formValue.views),
    };

  this.postApi.createPost(newPost)
    .pipe(
      tap((response: IPost) => {
        console.log('Новый пост создан:', response);
        this.router.navigate(['/posts']);
      }),
      finalize(() => this.isSubmitting = false)
    )
    .subscribe();
  }

}
