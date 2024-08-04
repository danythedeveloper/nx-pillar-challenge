import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Login, Logout } from './auth.actions';
import { Injectable } from '@angular/core';

export interface AuthStateModel {
  username: string;
  token: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: '',
    token: '',
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService
      .login(action.payload.username, action.payload.password)
      .pipe(
        tap((result: any) => {
          ctx.setState({
            username: action.payload.username,
            token: result.token,
          });
        })
      );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      username: '',
      token: '',
    });
  }
}
