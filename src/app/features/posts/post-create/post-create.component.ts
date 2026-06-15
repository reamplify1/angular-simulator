import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostApiService } from '../post-api.service';
import { tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { IPost } from '../interfaces/IPost';
import { IPostCreateForm } from '../interfaces/IPostCreateForm';
import { ToFormControls } from '../../../types/ToFormControls';

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

  postForm: FormGroup<ToFormControls<IPostCreateForm>> = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    userId: [1, [Validators.required]],
    tags: ['', [Validators.required]],
    views: [0],
    reactions: this.fb.group({
      likes: [0],
      dislikes: [0],
    })
  }) as FormGroup<ToFormControls<IPostCreateForm>>;

  onSubmit(): void {
    if (this.postForm.invalid) return;

    const formValue: IPostCreateForm = this.postForm.value as IPostCreateForm;

    const tagsArray: string[] = formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [];

    const newPost: IPost = {
      ...formValue,
      id: Date.now(),
      userId: Number(formValue.userId),
      tags: tagsArray,
      views: Number(formValue.views),
    };

  this.postApi.createPost(newPost)
    .pipe(
      tap((response: IPost) => {
        this.router.navigate(['/posts']);
      }),
    )
    .subscribe();
  }

}
