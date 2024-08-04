import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api/menuitem';
import { MenubarModule } from 'primeng/menubar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Increment } from '../../store/dashboard/states/counter/counter.actions';
import { CounterState } from '../../store/dashboard/states/counter/counter.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenubarModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private store = inject(Store);
  count$: Observable<number> = this.store.select(CounterState.getCount);

  items: MenuItem[];

  constructor() {
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
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: '/login',
      },
    ];
  }

  add() {
    this.store.dispatch(new Increment());
  }
}
