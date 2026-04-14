import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../interfaces/IUser';
import type { ToFormControls } from '../types/ToFormControls';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})

export class CreateUserComponent {

  @Output() onCreateUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  private notificationService: NotificationService = inject(NotificationService);
  private userService: UserService = inject(UserService);
  private fb: FormBuilder = inject(FormBuilder);

  private fillUnknown(obj: Record<string, unknown>): void {
    (Object.keys(obj) as Array<keyof typeof obj>).forEach((key) => {
      const value: unknown = obj[key];

      if (value === '' || value == null) {
        obj[key] = 'Неизвестно';
        return;
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        this.fillUnknown(value as Record<string, unknown>);
      }
    });
  }

  createUserForm: FormGroup<ToFormControls<IUser>> = this.fb.group({
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
  }) as FormGroup<ToFormControls<IUser>>;

  onSubmit(): void {
    if (this.createUserForm.invalid) {
      this.notificationService.showError('Fill out all fields correctly');
      return;
    }

    const formValue: IUser = this.createUserForm.getRawValue() as IUser;

    const submittedData: IUser = { ...formValue };

    this.fillUnknown(submittedData as unknown as Record<string, unknown>);

    this.notificationService.showSuccess('Пользователь успешно добавлен');
    this.onCreateUser.emit(submittedData);

    this.createUserForm.reset();
  }

}
