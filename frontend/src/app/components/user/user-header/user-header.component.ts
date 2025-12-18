import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../../../interfaces/common-interface';
import Swal from 'sweetalert2';
import { USER_ROUTES_PATHS } from '../../../constants/user-route.constant';
import { SocketService } from '../../../services/socket/socket.service';

@Component({
  selector: 'app-user-header',
  imports: [RouterLink],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent implements OnInit {
  isLoggedIn = false;

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private socketService: SocketService = inject(SocketService);

  ngOnInit(): void {
    this.authService.isUserLoggedIn$
      .pipe(take(1))
      .subscribe((status) => (this.isLoggedIn = status));
  }

  logout() {
    this.authService
      .userLogout()
      .pipe(take(1))
      .subscribe({
        next: (res: ApiResponse<null>) => {
          this.socketService.disconnect();

          Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: res.message || 'You have been logged out successfully',
            timer: 2000,
            showConfirmButton: false,
          });

          this.router.navigate([USER_ROUTES_PATHS.LOGIN]);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Logout Failed',
            text: err?.message || 'Something went wrong.',
          });
        },
      });
  }
}
