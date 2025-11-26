import { ApiProperty } from '@nestjs/swagger';
import { Min, Max } from 'class-validator';
import { CartResponseDto } from 'src/cart/dto/cartResponse.dto';

export class OrderResponseDto extends CartResponseDto {
  @ApiProperty({ example: 799 })
  override totalPrice = 0;

  @ApiProperty({ example: 799 })
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  discountedAmount = 0;
}
