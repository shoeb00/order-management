import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './interfaces/cart.interface';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CartResponseDto } from './dto/cartResponse.dto';
import { UpdateCartRequestDto } from './dto/updateCartRequest.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('get/:userId')
  @ApiOkResponse({ type: CartResponseDto })
  async getCart(@Param('userId', ParseIntPipe) userId: number): Promise<Cart> {
    return await this.cartService.getCart(userId);
  }

  @Post('checkout/:userId')
  @ApiOkResponse({ type: CartResponseDto })
  async checkout(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return await this.cartService.checkout(userId);
  }

  @Post('add/:userId')
  @ApiBody({ type: UpdateCartRequestDto, isArray: true })
  async updateCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(new ParseArrayPipe({ items: UpdateCartRequestDto }))
    products: UpdateCartRequestDto[],
  ): Promise<Cart> {
    return await this.cartService.updateCart(userId, products);
  }

  @Delete('clear/:userId')
  async clearCart(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return await this.cartService.clearCart(userId);
  }
}
