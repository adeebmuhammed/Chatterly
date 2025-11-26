import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map, Observable } from 'rxjs';
import { USER_ROUTES_PATHS } from '../../constants/user-route.constant';

@Injectable({
  providedIn: 'root',
})

export class userAlreadyLoggedInGuard implements CanActivate {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  canActivate(): Observable<boolean> {
    return this.authService.isUserLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate([USER_ROUTES_PATHS.HOME]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
