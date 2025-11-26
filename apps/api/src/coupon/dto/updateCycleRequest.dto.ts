import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class UpdateCouponCycleDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  @Max(100)
  couponCycle: number;
}
