import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/database/interfaces/database.interface';
import { Product } from 'src/product/interfaces/product.interface';
import { Cart } from './interfaces/cart.interface';
import { DATABASE } from 'src/database/token';
import { UpdateCartRequestDto } from './dto/updateCartRequest.dto';

@Injectable()
export class CartService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async getCart(userId: number): Promise<Cart> {
    const cart = this.db.carts.find((cart) => cart.userId === userId);
    if (!cart) throw new BadRequestException('Cart not found');
    return cart;
  }

  async findOrCreateCart(userId: number): Promise<Cart> {
    const cart = this.db.carts.find((cart) => cart.userId === userId);
    if (!cart)
      this.db.carts.push({
        id: this.db.carts.length + 1,
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

  async checkout(userId: number): Promise<void> {
    const cart = await this.getCart(userId);
    // create order for this cart
    return;
  }

  async clearCart(userId: number): Promise<void> {
    const index = this.db.carts.findIndex((cart) => cart.userId === userId);
    if (index === -1) throw new BadRequestException('Cart not found');
    this.db.carts.splice(index, 1);
    return;
  }
}
