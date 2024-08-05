import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api/menuitem';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Increment } from '../../store/dashboard/states/counter/counter.actions';
import { CounterState } from '../../store/dashboard/states/counter/counter.state';
import { AuthState } from '../../store/auth/auth.state';
import { UserData } from '../../model/types/user.type';
import { Logout } from '../../store/auth/auth.actions';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenubarModule, AsyncPipe, AvatarModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private store = inject(Store);
  count$: Observable<number> = this.store.select(CounterState.getCount);
  //User Data
  user$: Observable<UserData> = this.store.select(AuthState.getUser);
  isUserAuthenticated$: Observable<boolean> = this.store.select(
    AuthState.isAuthenticated
  );

  items: MenuItem[] = [];

  constructor() {
    this.isUserAuthenticated$.subscribe((isUserAuth) => {
      if (isUserAuth) {
        this.items = [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: '/dashboard',
          },
          {
            label: 'Products',
            icon: 'pi pi-fw pi-list',
            routerLink: '/dashboard/products',
          },
          {
            label: 'Users',
            icon: 'pi pi-fw pi-users',
            routerLink: '/dashboard/users',
          },
          {
            label: 'Categories',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/dashboard/categories',
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            command: () => this.logout(),
          },
        ];
      }
    });
  }

  add() {
    this.store.dispatch(new Increment());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
