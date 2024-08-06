import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AbstractDatabaseService } from './abstract-database.service';

import { randomBytes } from 'crypto';
import { Category } from '../model/types/category.type';

interface CategoryDatabase {
  categories: Category[];
}

@Injectable()
export class CategoryService extends AbstractDatabaseService<CategoryDatabase> {
  constructor() {
    super('categories.json', { categories: [] });
  }

  async getItems(): Promise<Category[]> {
    await this.db.read();
    return this.db.data.categories;
  }

  async add(category: Omit<Category, 'id'>): Promise<void> {
    await this.db.read();
    const existingCategory = this.db.data.categories.find(
      (c) => c.name === category.name
    );
    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    const id = randomBytes(16).toString('hex');
    this.db.data.categories.push({ ...category, id });
    await this.db.write();
  }

  async edit(id: string, name: string): Promise<void> {
    await this.db.read();
    const category = this.db.data.categories.find((c) => c.id === id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = name;
    await this.db.write();
  }
}
