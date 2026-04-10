import { NotificationService } from './../services/notification.service';
import { FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import type {IUserForm} from '../interfaces/IUserForm.ts';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  private notificationService: NotificationService = inject(NotificationService);
  private fb: FormBuilder = inject(FormBuilder);

  createUserForm: FormGroup<IUserForm> = this.fb.group({
    id: [{ value: Date.now(), disabled: true }],
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
  });

  onSubmit(): void {
    if (this.createUserForm.invalid) {
      this.notificationService.showError('Fill out all fields correctly');
      return;
    }

    const formValue: ReturnType<typeof this.createUserForm.getRawValue> = this.createUserForm.getRawValue();

    const submittedData: typeof formValue  = { ...formValue };

    if (!submittedData.website) submittedData.website = 'Неизвестно';

    if (!submittedData.company.catchPhrase) submittedData.company.catchPhrase = 'Неизвестно';

    if (!submittedData.company.bs) submittedData.company.bs = 'Неизвестно';

    if (!submittedData.address.suite) submittedData.address.suite = 'Неизвестно';

    console.log('Final user form:', submittedData);
  }

}
