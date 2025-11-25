import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
