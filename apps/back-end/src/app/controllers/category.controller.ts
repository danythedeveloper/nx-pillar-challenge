import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from '../databases/category-database.service';
import { Category } from '../model/types/category.type';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getItems();
  }

  @Post()
  async addCategory(@Body() category: Omit<Category, 'id'>) {
    await this.categoryService.add(category);
    return { message: 'Category added successfully' };
  }

  @Put(':id')
  async editCategory(@Param('id') id: string, @Body('name') name: string) {
    try {
      await this.categoryService.edit(id, name);
      return { message: 'Category updated successfully' };
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
