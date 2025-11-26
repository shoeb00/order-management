import { Cart } from 'src/cart/interfaces/cart.interface';
import { Coupon } from 'src/coupon/interfaces/coupon.interface';
import { Order } from 'src/order/interfaces/order.interface';
import { Product } from 'src/product/interfaces/product.interface';

export interface Database {
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  carts: Cart[];
  couponCycle: number;
  discountPercentage: number;
}
