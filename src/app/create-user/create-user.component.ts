import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import type {IUserForm} from '../interfaces/IUserForm.ts';
import { IUser } from '../interfaces/IUser';
import type { ToFormControls } from '../types/ToFormControls';

function fillUnknown(obj: any): void {
  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (value === '' || value === null || value === undefined) {
      obj[key] = 'Неизвестно';
    }

    if (typeof value === 'object' && value !== null) {
      fillUnknown(value);
    }
  });
}

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})

export class CreateUserComponent {

  private notificationService: NotificationService = inject(NotificationService);
  private userService: UserService = inject(UserService);
  private fb: FormBuilder = inject(FormBuilder);

  @Output() addUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  createUserForm: FormGroup<ToFormControls<IUser>> = this.fb.group({
    id: [ Date.now()],
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
  }) as FormGroup<ToFormControls<IUser>>;

  onSubmit(): void {
    if (this.createUserForm.invalid) {
      this.notificationService.showError('Fill out all fields correctly');
      return;
    }

    const formValue: IUserForm = this.createUserForm.getRawValue() as IUserForm;

    const submittedData: IUser = { ...formValue } as IUser;

    fillUnknown(submittedData);

    this.notificationService.showSuccess('Пользователь успешно добавлен');
    this.addUser.emit(submittedData);

    this.createUserForm.reset();
    console.log('Final user form:', submittedData);
  }

}
