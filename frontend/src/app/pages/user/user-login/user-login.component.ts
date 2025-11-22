import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { USER_ROUTES_PATHS } from '../../../constants/user-route.constant';
import { UserHeaderComponent } from '../../../components/user/user-header/user-header.component';

@Component({
  selector: 'app-user-login',
  imports: [
    UserHeaderComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnDestroy{
  loginForm: FormGroup;
  errorMessage = '';

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService
        .userSignin({ email, password })
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe({
          next: (res) => {

            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: `Welcome back!`,
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              this.router.navigate([USER_ROUTES_PATHS.HOME]);
            });
          },
          error: () => {
            this.errorMessage = 'Login failed';

            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: this.errorMessage,
            });
          },
        });
    }
  }

  componentDestroyed$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
