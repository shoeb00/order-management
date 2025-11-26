import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetOrderRequestDto } from './dto/getOrderRequest.dto';
import { Order } from './interfaces/order.interface';
import { ApiOkResponse } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/orderResponse.dto';
import { OrderSummaryResponseDto } from './dto/orderSummaryResponse.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('get')
  @ApiOkResponse({ type: OrderResponseDto, isArray: true })
  async getOrders(@Query() request: GetOrderRequestDto): Promise<Order[]> {
    return this.orderService.getOrders(request);
  }

  @Get('summary')
  @ApiOkResponse({ type: OrderSummaryResponseDto })
  async orderSummary(): Promise<OrderSummaryResponseDto> {
    return this.orderService.orderSummary();
  }
}
