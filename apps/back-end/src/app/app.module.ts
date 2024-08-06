import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AuthModule } from './auth/auth.module'; // Import the AuthModule

import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { UserService } from './databases/user-database.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { CategoryService } from './databases/category-database.service';
import { ProductService } from './databases/product-database.service';

@Module({
  imports: [
    AuthModule, // Import AuthModule to enable JWT authentication
  ],
  controllers: [AppController, CategoryController, ProductController],
  providers: [
    AppService,
    UserService,
    CategoryService,
    ProductService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Globally apply the JWT guard
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
