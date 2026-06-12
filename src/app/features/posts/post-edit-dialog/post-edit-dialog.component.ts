import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
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

  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);

  private fb: FormBuilder = inject(FormBuilder);

  editForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  onCancel(): void {
    this.ref.close(null);
  }

  onSubmit(): void {
    const formValue: IPostEditForm = this.editForm.value;

    const editedPost: IPostEditRequest = {
      title: formValue.title,
      views: Number(formValue.views ?? 0),
      tags: formValue.tags
        ? formValue.tags.split(',').map((t: string) => t.trim())
        : []
    };

    this.ref.close(editedPost);
  }

  ngOnInit(): void {
    const post: IPost = this.config.data.post;

    if (!post) return;

    this.editForm.patchValue({
      title: post.title,
      tags: post.tags.join(', '),
      views: post.views ?? 0,
    });
  }

}
