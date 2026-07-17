import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../interfaces/IPost';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { IPostEditForm } from '../interfaces/IPostEditForm';
import { IPostEditRequest } from '../interfaces/IPostEditRequest';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [CommonModule, ReactiveFormsModule, InputNumberModule, ButtonModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {
  private dialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const post: IPost = this.dialogConfig.data.post;
    if (!post) return;

    this.editForm.patchValue({
      title: post.title,
      tags: post.tags.join(', '),
      views: post.views,
    });
  }

  editForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const formValue: IPostEditForm = this.editForm.value;

    const tags: string[] = formValue.tags
      ? formValue.tags.split(',').map((tag: string) => tag.trim())
      : [];

    const editedPost: IPostEditRequest = {
      title: formValue.title,
      views: Number(formValue.views ?? 0),
      tags,
    };

    this.dialogRef.close(editedPost);
  }
}
