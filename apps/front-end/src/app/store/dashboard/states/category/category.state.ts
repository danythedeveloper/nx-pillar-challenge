import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Category } from 'apps/front-end/src/app/model/types/category.type';
import { CategoryService } from 'apps/front-end/src/app/services/category.service';
import { AddCategory, EditCategory, LoadCategories } from './category.actions';
import { tap } from 'rxjs';

export interface CategoryStateModel {
  categories: Category[];
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
  },
})
@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService) {}

  @Selector()
  static getCategories(state: CategoryStateModel): Category[] {
    return state.categories;
  }

  @Action(LoadCategories)
  loadCategories(ctx: StateContext<CategoryStateModel>) {
    return this.categoryService.getCategories().pipe(
      tap((categories) => {
        ctx.patchState({ categories: categories });
      })
    );
  }

  @Action(AddCategory)
  addCategory(ctx: StateContext<CategoryStateModel>, action: AddCategory) {
    return this.categoryService.addCategory(action.payload).pipe(
      tap(() => {
        ctx.dispatch(new LoadCategories());
      })
    );
  }

  @Action(EditCategory)
  editCategory(ctx: StateContext<CategoryStateModel>, action: EditCategory) {
    return this.categoryService.editCategory(action.id, action.name).pipe(
      tap(() => {
        ctx.dispatch(new LoadCategories());
      })
    );
  }
}
