import { Product } from 'apps/front-end/src/app/model/types/product.type';

export class LoadProducts {
  static readonly type = '[Product] Load Products';
}

export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public payload: Omit<Product, 'id'>) {}
}

export class EditProduct {
  static readonly type = '[Product] Edit Product';
  constructor(public id: string, public payload: Product) {}
}
