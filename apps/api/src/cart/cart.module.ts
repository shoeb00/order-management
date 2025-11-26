import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from 'src/common/common.module';
import { OrderModule } from 'src/order/order.module';
import { CouponModule } from 'src/coupon/coupon.module';

@Module({
  imports: [DatabaseModule, CommonModule, OrderModule, CouponModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
