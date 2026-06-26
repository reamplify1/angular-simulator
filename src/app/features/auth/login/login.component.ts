import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private notificationService: NotificationService = inject(NotificationService);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const credentials: ILoginRequest = this.loginForm.value;
    this.authService.login(credentials).pipe(
      tap(() => {
        this.router.navigate(['/']);
      }),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError('Не удалось войти. Проверьте правильность введенных данных.');
        return throwError(() => error);
      })
    )
    .subscribe()
  }

}
