import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/database/interfaces/database.interface';
import { DATABASE } from 'src/database/token';
import { GetOrderRequestDto } from './dto/getOrderRequest.dto';
import { Order } from './interfaces/order.interface';
import { OrderSummaryResponseDto } from './dto/orderSummaryResponse.dto';

@Injectable()
export class OrderService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async getOrders(request: GetOrderRequestDto): Promise<Order[]> {
    let orders = await this.db.orders;
    if (request.userId) {
      orders = orders.filter((order) => order.userId === request.userId);
    }
    if (orders.length === 0) throw new BadRequestException('Order not found');
    return orders.slice(request.offset, request.offset + request.limit);
  }

  async orderSummary(): Promise<OrderSummaryResponseDto> {
    const summary = new OrderSummaryResponseDto();
    const couponCodes = this.db.coupons.flatMap((c) =>
      !c.isActive && c.code ? [c.code] : [],
    );
    this.db.orders.forEach((order) => {
      summary.totalAmount += order.totalPrice;
      summary.discountedAmount += order.discountedAmount;
      // TODO: replace with product name and quantity for each order
      summary.totalItemsSold += order.quantity;
      summary.listOfDiscountCoupons = couponCodes;
    });
    return summary;
  }

  async createOrder(order: Order) {
    await this.db.orders.push(order);
  }
}
