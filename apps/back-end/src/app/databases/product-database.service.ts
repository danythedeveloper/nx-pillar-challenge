import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AbstractDatabaseService } from './abstract-database.service';

import { randomBytes } from 'crypto';
import { Product } from '../model/types/product.type';
import { CategoryService } from './category-database.service';

interface ProductDatabase {
  products: Product[];
}

@Injectable()
export class ProductService extends AbstractDatabaseService<ProductDatabase> {
  constructor(private categoryService: CategoryService) {
    super('products.json', { products: [] });
  }

  async getItems(): Promise<Product[]> {
    await this.db.read();
    return this.db.data.products;
  }

  async add(product: Omit<Product, 'id'>): Promise<void> {
    await this.db.read();
    const category = await this.categoryService
      .getItems()
      .then((categories) =>
        categories.find((c) => c.id === product.categoryId)
      );
    if (!category) {
      throw new BadRequestException('Invalid category ID');
    }

    const id = randomBytes(16).toString('hex');
    this.db.data.products.push({ ...product, id });
    await this.db.write();
  }

  async edit(
    id: string,
    name: string,
    price: string,
    categoryId: string
  ): Promise<void> {
    await this.db.read();
    const product = this.db.data.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.name = name;
    product.price = `${price}`;
    product.categoryId = categoryId;
    await this.db.write();
  }
}
