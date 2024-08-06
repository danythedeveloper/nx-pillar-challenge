import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from '../databases/product-database.service';
import { Product } from '../model/types/product.type';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getItems();
  }

  @Post()
  async addProduct(@Body() product: Omit<Product, 'id'>) {
    try {
      await this.productService.add(product);
      return { message: 'Product added successfully' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Put(':id')
  async editProduct(
    @Param('id') id: string,
    @Body() productDto: Partial<Product>
  ) {
    const { name, price, categoryId } = productDto;
    try {
      await this.productService.edit(id, name, price, categoryId);
      return { message: 'Product updated successfully' };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message);
      } else {
        throw new BadRequestException(e.message);
      }
    }
  }
}
