import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserData } from 'apps/front-end/src/app/model/types/user.type';
import { UsersService } from 'apps/front-end/src/app/services/users.service';
import { LoadUsers } from './users.actions';
import { tap } from 'rxjs';

export interface UserStateModel {
  users: UserData[];
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) {}

  @Selector()
  static getUsers(state: UserStateModel): UserData[] {
    return state.users;
  }

  @Action(LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>, action: LoadUsers) {
    return this.usersService.getUsers().pipe(
      tap((result: any) => {
        ctx.setState({ users: result });
      })
    );
  }
}
