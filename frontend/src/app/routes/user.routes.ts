import { Routes } from "@angular/router";
import { USER_ROUTES_PATHS } from "../constants/user-route.constant";
import { UserLoginComponent } from "../pages/user/user-login/user-login.component";
import { UserSignupComponent } from "../pages/user/user-signup/user-signup.component";
import { UserVerifyOtpComponent } from "../pages/user/user-verify-otp/user-verify-otp.component";
import { UserHomeComponent } from "../pages/user/user-home/user-home.component";
import { userAuthGuard } from "../guards/user-auth/user-auth.guard";
import { userAlreadyLoggedInGuard } from "../guards/user-already-logged-in/user-already-logged-in.guard";

export const USER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: USER_ROUTES_PATHS.LOGIN,
    pathMatch: 'full',
  },
  {
    path: USER_ROUTES_PATHS.HOME,
    component: UserHomeComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: USER_ROUTES_PATHS.LOGIN,
    component: UserLoginComponent,
    canActivate: [userAlreadyLoggedInGuard],
  },
  {
    path: USER_ROUTES_PATHS.SIGNUP,
    component: UserSignupComponent,
    canActivate: [userAlreadyLoggedInGuard],
  },
  { path: USER_ROUTES_PATHS.VERIFY_OTP, component: UserVerifyOtpComponent },
];
