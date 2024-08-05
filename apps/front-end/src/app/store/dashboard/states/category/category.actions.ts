import { Category } from 'apps/front-end/src/app/model/types/category.type';

export class LoadCategories {
  static readonly type = '[Category] Load Categories';
}

export class AddCategory {
  static readonly type = '[Category] Add Category';
  constructor(public payload: Omit<Category, 'id'>) {}
}

export class EditCategory {
  static readonly type = '[Category] Edit Category';
  constructor(public id: string, public name: string) {}
}
