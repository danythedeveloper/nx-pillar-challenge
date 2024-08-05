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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenubarModule, AsyncPipe, AvatarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
            routerLink: '/home',
          },
          {
            label: 'Products',
            icon: 'pi pi-fw pi-list',
            routerLink: '/products',
          },
          {
            label: 'Users',
            icon: 'pi pi-fw pi-users',
            routerLink: '/users',
          },
          {
            label: 'Categories',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/categories',
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
