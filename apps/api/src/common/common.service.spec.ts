import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonService],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate random string', () => {
    const result = service.generateRandomString(6);
    expect(result).toHaveLength(6);
  });

  it('should generate UID', () => {
    const result = service.getUID(6);
    expect(result).toBeGreaterThanOrEqual(100000);
    expect(result).toBeLessThanOrEqual(999999);
  });
});
