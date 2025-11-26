import { ApiProperty } from '@nestjs/swagger';

export class CouponResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ABC123' })
  code: string;

  @ApiProperty({ example: true })
  isActive: boolean;
  
  @ApiProperty({ example: 10 })
  discountPercentage: number;
}
