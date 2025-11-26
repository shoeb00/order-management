import { OrderService } from './../order/order.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/database/interfaces/database.interface';
import { Cart } from './interfaces/cart.interface';
import { DATABASE } from 'src/database/token';
import { UpdateCartRequestDto } from './dto/updateCartRequest.dto';
import { CommonService } from 'src/common/common.service';
import { CouponService } from 'src/coupon/coupon.service';

@Injectable()
export class CartService {
  constructor(
    @Inject(DATABASE) private readonly db: Database,
    private readonly commonService: CommonService,
    private readonly couponService: CouponService,
    private readonly orderService: OrderService,
  ) {}

  async getCart(userId: number): Promise<Cart> {
    const cart = this.db.carts.find((cart) => cart.userId === userId);
    if (!cart) throw new BadRequestException('Cart not found');
    return cart;
  }

  async findOrCreateCart(userId: number): Promise<Cart> {
    const cart = this.db.carts.find((cart) => cart.userId === userId);
    if (!cart)
      this.db.carts.push({
        id: this.commonService.getUID(),
        userId,
        products: [],
        numberOfProducts: 0,
        totalPrice: 0,
      });
    return this.db.carts.at(-1);
  }

  async updateCart(
    userId: number,
    products: UpdateCartRequestDto[],
  ): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    products.forEach((item) => {
      const productInStock = this.db.products.find(
        (p) => item.productId === p.id,
      );
      if (!productInStock) throw new BadRequestException('Product not found');
      if (item.quantity > productInStock.quantity)
        throw new BadRequestException('Product is out of stock');
      const productInCart = cart.products.find((p) => p.id === item.productId);
      if (productInCart) productInCart.quantity += item.quantity;
      else cart.products.push({ ...productInStock, quantity: item.quantity });
      productInStock.quantity -= item.quantity;
      cart.numberOfProducts += item.quantity;
      cart.totalPrice += productInStock.price * item.quantity;
    });
    return cart;
  }

  async checkout(userId: number, couponCode?: string): Promise<void> {
    const cart = await this.getCart(userId);
    if (!cart.products.length) throw new BadRequestException('Cart is empty');
    const orderId = this.db.orders.length + 1;
    if (couponCode && orderId % this.db.couponCycle)
      throw new BadRequestException('Coupon not applicable for this order');
    const order = {
      id: this.db.orders.length + 1,
      userId,
      products: cart.products,
      quantity: cart.numberOfProducts,
      totalPrice: cart.totalPrice,
      discountedAmount: 0,
    };
    if (couponCode) {
      await this.couponService.useCoupon(couponCode, orderId);
      order.discountedAmount =
        cart.totalPrice * (this.db.discountPercentage / 100);
      order.totalPrice -= order.discountedAmount;
    }
    await this.orderService.createOrder(order);
    await this.clearCart(userId);
    return;
  }

  async clearCart(userId: number): Promise<void> {
    const index = this.db.carts.findIndex((cart) => cart.userId === userId);
    if (index === -1) throw new BadRequestException('Cart not found');
    this.db.carts.splice(index, 1);
    return;
  }
}
