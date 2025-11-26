import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class UpdateCouponDiscountDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  @Max(100)
  discountPercentage: number;
}
