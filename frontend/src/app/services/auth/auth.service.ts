import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/common-interface';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // --- USER subjects ---
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(
    this.hasRoleToken('user')
  );
  private userNameSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('userName')
  );
  private userIdSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('userId')
  );

  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();

  private hasRoleToken(role: string): boolean {
    return (
      !!localStorage.getItem('token') && localStorage.getItem('role') === role
    );
  }

  // Update login state for roles
  updateLoginState(
    role = 'user',
    isLoggedIn: boolean,
    name: string | null,
    id: string | null
  ) {
    localStorage.setItem(`${role}Name`, name || '');
    localStorage.setItem(`${role}Id`, id || '');

    if (role === 'user') {
      this.isUserLoggedInSubject.next(isLoggedIn);
      this.userNameSubject.next(name);
      this.userIdSubject.next(id);
    }
  }

  // User
  userSignup(credentials: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${environment.apiBaseUrl}/signup`,
      credentials
    );
  }

  //   userVerifyOtp(data: { email: string; otp: string; }): Observable<{ message: string; user: { name: string; email: string } }> {
  //   return new Observable(observer => {
  //     this.http.post<{ message: string; user: { name: string; email: string } }>(`${environment.apiBaseUrl}/verify-otp`, data).subscribe({
  //       next: (res) => {
  //         observer.next(res);
  //         observer.complete();
  //       },
  //       error: err => observer.error(err)
  //     });
  //   });
  // }

  //   userResendOtp(data: { email: string; }): Observable<{ message: string; user: { name: string } }> {
  //   return this.http.post<{ message: string; user: { name: string } }>(`${environment.apiBaseUrl}/resend-otp`, data);
  // }

    userSignin(data: { email: string; password: string }): Observable<ApiResponse<null>> {
    return new Observable(observer => {
      this.http.post<ApiResponse<null>>(`${environment.apiBaseUrl}/login`, data).subscribe({
        next: (res: any) => {
          localStorage.setItem('role',"user");
          localStorage.setItem('token',res?.user?.token)
          const name = res.user?.name || '';
          const userId = res.user?.id || '';

          this.updateLoginState("user", true, name, userId);

          observer.next(res); // pass to component
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
}
