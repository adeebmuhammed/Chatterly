import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { USER_ROUTES_PATHS } from '../../constants/user-route.constant';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/refresh-token')) {
        return http
          .post(
            `${environment.apiBaseUrl}/refresh-token`,
            {},
            { withCredentials: true }
          )
          .pipe(
            switchMap(() => {
              return next(req);
            }),
            catchError((refreshError) => {
              router.navigate([USER_ROUTES_PATHS.LOGIN]);
              return throwError(() => refreshError);
            })
          );
      }

      return throwError(() => error);
    })
  );
};
