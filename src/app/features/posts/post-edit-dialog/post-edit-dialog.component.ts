import { Component, EventEmitter, inject, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPostFormValue } from './../interfaces/IPostFormValue';
import { IPost } from '../interfaces/IPost';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { IPostEditFormValue } from '../interfaces/IPostEditFormValue';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [CommonModule, ReactiveFormsModule, DialogModule, InputNumberModule, ButtonModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnChanges {

  @Input() post: IPost | null = null;
  @Input() isOpen: boolean = false;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<IPostEditFormValue> = new EventEmitter<IPostEditFormValue>();

  private fb: FormBuilder = inject(FormBuilder);

  editForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnChanges(): void {
  if (this.post) {
    this.editForm.patchValue({
      title: this.post.title,
      tags: this.post.tags.join(', '),
      views: this.post.views,
    });
  }
}

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    const formValue: IPostFormValue  = this.editForm.value;
    const editedPost: IPostEditFormValue = {
      title: formValue.title,
      views: formValue.views ?? 0,
      tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : []
    };
    this.save.emit(editedPost);
  }

}
