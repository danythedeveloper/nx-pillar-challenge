import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api/menuitem';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
}
