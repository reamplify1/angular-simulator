import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { ILoginRequest } from '../../../core/interfaces/ILoginRequest';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private notificationService: NotificationService =
    inject(NotificationService);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const credentials: ILoginRequest = this.loginForm.value;
    this.authService
      .login(credentials)
      .pipe(
        tap(() => {
          this.router.navigate(['/']);
        }),
        catchError(() => {
          this.notificationService.showError(
            'Не удалось войти. Проверьте правильность введенных данных.',
          );
          return of(null);
        }),
      )
      .subscribe();
  }
}
