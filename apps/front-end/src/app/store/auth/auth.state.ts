import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Authenticate, Logout } from './auth.actions';
import { Injectable } from '@angular/core';
import { UserData } from '../../model/types/user.type';
import { Router } from '@angular/router';

export interface AuthStateModel {
  email: string;
  token: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    email: '',
    token: '',
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private router: Router) {}

  @Selector()
  static getUser(state: AuthStateModel): UserData {
    const userData: UserData = {
      email: state.email,
    };
    return userData;
  }

  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(Authenticate)
  login(ctx: StateContext<AuthStateModel>, action: Authenticate) {
    const { email, password, mode } = action.payload;
    const serviceMethod =
      mode === 'login'
        ? this.authService.login.bind(this.authService)
        : this.authService.register.bind(this.authService);

    return serviceMethod(action.payload.email, action.payload.password).pipe(
      tap((result: any) => {
        ctx.setState({
          email: result.email,
          token: result.access_token,
        });
        this.router.navigate(['/dashboard']);
      }),
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      email: '',
      token: '',
    });
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
