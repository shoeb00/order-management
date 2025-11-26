import { Test, TestingModule } from '@nestjs/testing';
import { CouponController } from './coupon.controller';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('CouponController', () => {
  let controller: CouponController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponController],
    }).compile();

    controller = module.get<CouponController>(CouponController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
