import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min, Max } from 'class-validator';

export class OrderSummaryResponseDto {
  @ApiProperty({ example: 999 })
  @Type(() => Number)
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  totalAmount: number = 0;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  totalItemsSold: number = 0;

  @ApiProperty({ example: 99 })
  @Type(() => Number)
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  discountedAmount: number = 0;

  @ApiProperty({ type: () => String, isArray: true })
  listOfDiscountCoupons: string[] = [];
}
