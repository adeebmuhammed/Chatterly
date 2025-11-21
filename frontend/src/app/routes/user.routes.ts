import { Routes } from "@angular/router";
import { USER_ROUTES_PATHS } from "../constants/user-route.constant";
import { UserLoginComponent } from "../pages/user/user-login/user-login.component";
import { UserSignupComponent } from "../pages/user/user-signup/user-signup.component";

export const USER_ROUTES: Routes = [
//   {
//     path: USER_ROUTES_PATHS.HOME,
//     component: UserHomeComponent,
//     canActivate: [userAuthGuard],
//   },
  {
    path: USER_ROUTES_PATHS.LOGIN,
    component: UserLoginComponent,
    // canActivate: [userAlreadyLoggedInGuard],
  },
  {
    path: USER_ROUTES_PATHS.SIGNUP,
    component: UserSignupComponent,
    // canActivate: [userAlreadyLoggedInGuard],
  },
//   { path: USER_ROUTES_PATHS.VERIFY_OTP, component: UserOtpComponent },
];
