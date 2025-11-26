import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/database/interfaces/database.interface';
import { DATABASE } from 'src/database/token';
import { CouponResponseDto } from './dto/couponResponse.dto';
import { CommonService } from 'src/common/common.service';
import { GetCouponRequestDto } from './dto/getCouponsRequest.dto';

@Injectable()
export class CouponService {
  constructor(
    @Inject(DATABASE) private readonly db: Database,
    private readonly commonService: CommonService,
  ) {}

  async getCoupons(request: GetCouponRequestDto): Promise<CouponResponseDto[]> {
    return (
      (await this.db.coupons.slice(
        request.offset,
        request.offset + request.limit,
      )) || []
    );
  }

  async generateCoupon(): Promise<CouponResponseDto> {
    const coupon = {
      id: this.db.coupons.length + 1,
      code: this.commonService.generateRandomString(),
      isActive: true,
      discountPercentage: this.db.discountPercentage,
    };
    await this.db.coupons.push(coupon);
    return coupon;
  }

  async validateCoupon(
    couponCode: string,
    orderId: number,
  ): Promise<CouponResponseDto> {
    const coupon = await this.db.coupons.find(
      (coupon) => coupon.code === couponCode,
    );
    if (!coupon) throw new BadRequestException('Coupon not found');
    else if (!coupon.isActive)
      throw new BadRequestException('Coupon already used');
    else if (orderId % this.db.couponCycle !== 0) {
      throw new BadRequestException('Coupon is not applicable on this order');
    }
    return coupon;
  }

  async useCoupon(couponCode: string, orderId: number): Promise<void> {
    const coupon = await this.validateCoupon(couponCode, orderId);
    coupon.isActive = false;
    return;
  }

  async updateDiscountPercentage(discountPercentage: number): Promise<void> {
    this.db.discountPercentage = discountPercentage;
    return;
  }

  async updateCouponCycle(couponCycle: number): Promise<void> {
    this.db.couponCycle = couponCycle;
    return;
  }
}
