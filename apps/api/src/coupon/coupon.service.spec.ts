import { Test, TestingModule } from '@nestjs/testing';
import { CouponService } from './coupon.service';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('CouponService', () => {
  let service: CouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponService],
    }).compile();

    service = module.get<CouponService>(CouponService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
