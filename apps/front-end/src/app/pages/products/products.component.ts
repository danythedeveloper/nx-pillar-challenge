import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DatagridComponent } from '../../shared/components/datagrid/datagrid.component';
import { Store } from '@ngxs/store';
import { combineLatest, map, Observable } from 'rxjs';
import { ProductsState } from '../../store/dashboard/states/product/product.state';
import { Product } from '../../model/types/product.type';
import {
  AddProduct,
  EditProduct,
  LoadProducts,
} from '../../store/dashboard/states/product/product.actions';
import { FieldConfig } from '../../model/types/fieldConfig.type';
import { LoadCategories } from '../../store/dashboard/states/category/category.actions';
import { Category } from '../../model/types/category.type';
import { CategoryState } from '../../store/dashboard/states/category/category.state';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DatagridComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private store = inject(Store);
  public productFieldConfigs: FieldConfig[] = [];
  productsGridData$!: Observable<{
    products: Product[];
    categories: Category[];
  }>;
  public showDataGrid = false;

  public products$: Observable<Product[]> = this.store.select(
    ProductsState.getProducts
  );
  public productCategories$: Observable<Category[]> = this.store.select(
    CategoryState.getCategories
  );

  ngOnInit(): void {
    this.store.dispatch(new LoadProducts());
    this.store.dispatch(new LoadCategories());
    this.productsGridData$ = combineLatest([
      this.products$,
      this.productCategories$,
    ]).pipe(
      map(([products, categories]) => {
        if (products.length > 0 && categories.length > 0) {
          this.productFieldConfigs = this.getProductFieldConfigs(categories);
          this.showDataGrid = true;
          return { products, categories };
        }
        return { products: [], categories: [] };
      })
    );
  }

  saveModifiedProduct(modifiedProduct: Product) {
    this.store.dispatch(new EditProduct(modifiedProduct.id, modifiedProduct));
  }

  createProduct(modifiedProduct: Product) {
    this.store.dispatch(new AddProduct(modifiedProduct));
  }

  getProductFieldConfigs(categories: Category[]): FieldConfig[] {
    return [
      {
        key: 'categoryId',
        label: 'Category',
        type: 'dropdown',
        hidden: false,
        options: categories.map((category) => ({
          label: category.name,
          value: category.id,
        })),
      },
      {
        key: 'categoryName',
        label: 'Category',
        type: 'text',
        hidden: true,
      },
    ];
  }
}
