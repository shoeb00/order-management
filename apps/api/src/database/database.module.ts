import { Module } from '@nestjs/common';
import { DATABASE } from './token';
import products from 'src/product/products.json';
import { Database } from './interfaces/database.interface';

@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: (): Database => ({
        products: products,
        orders: [],
        coupons: [],
        carts: [],
      }),
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
