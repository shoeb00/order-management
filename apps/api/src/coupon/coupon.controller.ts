import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { GetCouponRequestDto } from './dto/getCouponsRequest.dto';
import { CouponResponseDto } from './dto/couponResponse.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UpdateCouponDiscountDto } from './dto/updateDiscountRequest.dto';
import { UpdateCouponCycleDto } from './dto/updateCycleRequest.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get('get')
  @ApiOkResponse({ type: [CouponResponseDto], isArray: true })
  async getCoupon(
    @Query() query: GetCouponRequestDto,
  ): Promise<CouponResponseDto[]> {
    return await this.couponService.getCoupons(query);
  }

  @Post('generate')
  @ApiOkResponse({ type: CouponResponseDto })
  async generateCoupon(): Promise<CouponResponseDto> {
    return await this.couponService.generateCoupon();
  }

  @Put('update-discount')
  @ApiBody({ type: UpdateCouponDiscountDto })
  async updateDiscountPercentage(
    @Body() body: { discountPercentage: number },
  ): Promise<void> {
    await this.couponService.updateDiscountPercentage(body.discountPercentage);
    return;
  }

  @Put('update-cycle')
  @ApiBody({ type: UpdateCouponCycleDto })
  async updateCouponCycle(@Body() body: { couponCycle: number }): Promise<void> {
    await this.couponService.updateCouponCycle(body.couponCycle);
    return;
  }
}
