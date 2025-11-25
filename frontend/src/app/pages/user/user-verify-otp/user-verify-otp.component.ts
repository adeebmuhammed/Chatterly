import { Component, inject } from '@angular/core';
import { UserHeaderComponent } from '../../../components/user/user-header/user-header.component';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGEX } from '../../../constants/regex';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { USER_ROUTES_PATHS } from '../../../constants/user-route.constant';

@Component({
  selector: 'app-user-verify-otp',
  imports: [
    UserHeaderComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-verify-otp.component.html',
  styleUrl: './user-verify-otp.component.css'
})
export class UserVerifyOtpComponent {
  otpForm: FormGroup;
  email: string | null = '';
  countdown = 60;
  isResendDisabled = true;
  interval: any;

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  constructor() {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(REGEX.OTP)]],
    });
  }

  ngOnInit(): void {
    this.startResendTimer();
    this.email = localStorage.getItem('userSignupEmail');
  }

  onSubmit(): void {
    console.log("clicked");
    
    if (this.otpForm.valid && this.email) {
      const otpValue = this.otpForm.value.otp;
      this.authService.userVerifyOtp({
        email: this.email,
        otp: otpValue
      }).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'OTP Verified',
            text: 'Account verified!',
            timer: 2000,
            showConfirmButton: false,
          }).then(()=>{
            this.router.navigate([USER_ROUTES_PATHS.LOGIN])
          })
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Verification Failed',
            text: 'Invalid or expired OTP.',
          });
        },
      });
    }
  }

  resendOtp(): void {
    console.log("resend clicked");
    
    if (this.email) {
      this.authService.userResendOtp({ email: this.email }).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'OTP Resent',
            text: res.message || 'New OTP sent to your email.',
            timer: 2000,
            showConfirmButton: false,
          });
          this.startResendTimer();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Resend Failed',
            text: 'Unable to resend OTP.',
          });
        },
      });
    }
  }

  startResendTimer(): void {
    this.isResendDisabled = true;
    this.countdown = 60;
    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.isResendDisabled = false;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
