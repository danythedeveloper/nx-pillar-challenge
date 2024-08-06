import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { CounterState } from '../../store/dashboard/states/counter/counter.state';
import { AuthState } from '../../store/auth/auth.state';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api/menuitem';
import { By } from '@angular/platform-browser';
import { Increment } from '../../store/dashboard/states/counter/counter.actions';
import { Logout } from '../../store/auth/auth.actions';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MenubarModule,
        AsyncPipe,
        AvatarModule,
        RouterModule.forRoot([]),
        NgxsModule.forRoot([CounterState, AuthState]),
      ],
      declarations: [DashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    // Mock store select to return observables
    spyOn(store, 'select').and.callFake((selector: any) => {
      switch (selector) {
        case CounterState.getCount:
          return of(10);
        case AuthState.getUser:
          return of({ name: 'John Doe', email: 'john.doe@example.com' });
        case AuthState.isAuthenticated:
          return of(true);
        default:
          return of(null);
      }
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct menu items for authenticated user', () => {
    const expectedItems: MenuItem[] = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/dashboard' },
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
        command: () => {
          return jasmine.any(Function);
        },
      },
    ];
    expect(component.items).toEqual(expectedItems);
  });

  it('should call add method and dispatch Increment action', () => {
    spyOn(store, 'dispatch');
    component.add();
    expect(store.dispatch).toHaveBeenCalledWith(new Increment());
  });

  it('should call logout method and dispatch Logout action', () => {
    spyOn(store, 'dispatch');
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(new Logout());
  });

  it('should display user name when authenticated', () => {
    const userElement = fixture.debugElement.query(By.css('.p-avatar p'));
    expect(userElement.nativeElement.textContent).toContain('John Doe');
  });
});
