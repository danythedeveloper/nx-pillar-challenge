import { Route } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuardFn } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [authGuardFn] },
];
