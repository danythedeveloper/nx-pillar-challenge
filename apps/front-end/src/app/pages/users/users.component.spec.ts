import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { CommonModule, AsyncPipe } from '@angular/common';
import { DatagridComponent } from '../../shared/components/datagrid/datagrid.component';
import { Store, NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { UsersState } from '../../store/dashboard/states/users/users.state';
import { LoadUsers } from '../../store/dashboard/states/users/users.actions';
import { UserData } from '../../model/types/user.type';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AsyncPipe,
        DatagridComponent,
        NoopAnimationsModule,
        NgxsModule.forRoot([UsersState]),
        UsersComponent, // Import the standalone component
        HttpClientTestingModule, // Import HttpClientTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    // Mock store select to return observables
    spyOn(store, 'select').and.callFake((selector: any) => {
      switch (selector) {
        case UsersState.getUsers:
          return of([
            { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
            { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
          ]);
        default:
          return of([]);
      }
    });

    // Mock store dispatch to spy on actions
    jest.spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LoadUsers on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadUsers());
  });

  it('should select users from the store', () => {
    component.users$.subscribe((users: UserData[]) => {
      expect(users.length).toBe(2);
      expect(users).toEqual([
        { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
      ]);
    });
  });

  it('should render datagrid with users', () => {
    const datagrid = fixture.debugElement.query(
      By.directive(DatagridComponent)
    );
    expect(datagrid).not.toBeNull();
    expect(datagrid.componentInstance.data).toEqual([
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
    ]);
  });
});
