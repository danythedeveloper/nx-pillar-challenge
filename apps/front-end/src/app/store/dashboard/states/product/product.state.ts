import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Category } from 'apps/front-end/src/app/model/types/category.type';
import { CategoryService } from 'apps/front-end/src/app/services/category.service';
import { tap } from 'rxjs';
import { Product } from 'apps/front-end/src/app/model/types/product.type';
import { ProductsService } from 'apps/front-end/src/app/services/products.service';
import { AddProduct, EditProduct, LoadProducts } from './product.actions';

export interface ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductsState {
  constructor(private productsService: ProductsService) {}

  @Selector()
  static getProducts(state: ProductStateModel): Product[] {
    return state.products;
  }

  @Action(LoadProducts)
  loadProducts(ctx: StateContext<ProductStateModel>) {
    return this.productsService.getProductsWithCategoryNames().pipe(
      tap((products) => {
        ctx.patchState({ products: products });
      })
    );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, action: AddProduct) {
    return this.productsService.addProduct(action.payload).pipe(
      tap(() => {
        ctx.dispatch(new LoadProducts());
      })
    );
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductStateModel>, action: EditProduct) {
    return this.productsService.editProduct(action.id, action.payload).pipe(
      tap(() => {
        ctx.dispatch(new LoadProducts());
      })
    );
  }
}
