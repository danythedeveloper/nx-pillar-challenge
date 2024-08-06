import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIProduct, Product } from '../model/types/product.type';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apiUrl = 'http://localhost:3000/api/products';
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}
  getProducts(): Observable<APIProduct[]> {
    return this.http.get<APIProduct[]>(this.apiUrl);
  }

  getProductsWithCategoryNames(): Observable<Product[]> {
    return forkJoin([
      this.getProducts(),
      this.categoryService.getCategories(),
    ]).pipe(
      map(([products, categories]) => {
        const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
        return products.map((product) => ({
          ...product,
          categoryName: categoryMap.get(product.categoryId) || 'Unknown',
        }));
      })
    );
  }

  // Method to format products to APIProduct type
  private formatProductToAPI(product: Product): APIProduct {
    const { id, name, price, categoryId } = product;
    return { id, name, price, categoryId };
  }

  addProduct(payload: Omit<Product, 'id'>): Observable<any> {
    const formattedPayload = this.formatProductToAPI(payload as Product);
    return this.http.post<APIProduct>(this.apiUrl, formattedPayload);
  }

  editProduct(id: string, product: Product): Observable<APIProduct> {
    const formattedPayload = this.formatProductToAPI(product);
    return this.http.put<APIProduct>(`${this.apiUrl}/${id}`, formattedPayload);
  }
}
