import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridComponent } from '../../shared/components/datagrid/datagrid.component';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category } from '../../model/types/category.type';
import { CategoryState } from '../../store/dashboard/states/category/category.state';
import {
  AddCategory,
  EditCategory,
  LoadCategories,
} from '../../store/dashboard/states/category/category.actions';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, DatagridComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private store = inject(Store);
  public categories$: Observable<Category[]> = this.store.select(
    CategoryState.getCategories
  );

  ngOnInit(): void {
    this.store.dispatch(new LoadCategories());
  }

  saveModifiedCategory(modifiedCategory: Category) {
    this.store.dispatch(
      new EditCategory(modifiedCategory.id, modifiedCategory.name)
    );
  }

  createCategory(modifiedCategory: Category) {
    this.store.dispatch(new AddCategory(modifiedCategory));
  }
}
