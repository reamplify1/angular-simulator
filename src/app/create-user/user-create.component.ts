import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../interfaces/IUser';
import type { ToFormControls } from '../types/ToFormControls';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})

export class UserCreateComponent {

  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  private fb: FormBuilder = inject(FormBuilder);

  userForm: FormGroup<ToFormControls<IUser>> = this.fb.group({
    id: [Date.now()],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],

    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required]
      })
    }),

    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]]
    })
  }) as FormGroup<ToFormControls<IUser>>

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formValue: IUser = this.userForm.getRawValue() as IUser;

    const submittedData: IUser = {
      ...formValue,
      id: Date.now() + Math.random()
    };

    this.createUser.emit(submittedData);

    this.userForm.reset();
  }

}
