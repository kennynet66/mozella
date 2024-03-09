import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/User/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "user", component: UserDashboardComponent},
  {path: "admin", component: AdminDashboardComponent}
];
