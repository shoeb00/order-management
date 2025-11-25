import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class UpdateCartRequestDto {
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsNumber()
  @ApiProperty({ example: 1 })
  productId: number;

  @Min(0)
  @Max(1000)
  @IsNumber()
  @ApiProperty({ example: 1 })
  quantity: number;
}
