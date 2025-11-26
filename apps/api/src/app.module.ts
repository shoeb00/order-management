import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { CartModule } from './cart/cart.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ProductModule,
    DatabaseModule,
    OrderModule,
    CouponModule,
    CartModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
