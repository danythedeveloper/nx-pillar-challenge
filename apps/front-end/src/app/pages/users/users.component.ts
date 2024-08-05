import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DatagridComponent } from '../../shared/components/datagrid/datagrid.component';
import { Store } from '@ngxs/store';
import {
  GetUsers,
  LoadUsers,
} from '../../store/dashboard/states/users/users.actions';
import { Observable } from 'rxjs';
import { UserData } from '../../model/types/user.type';
import { UsersState } from '../../store/dashboard/states/users/users.state';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DatagridComponent, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  private store = inject(Store);
  public users$: Observable<UserData[]> = this.store.select(
    UsersState.getUsers
  );

  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
  }
}
