import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from 'src/product/dto/productResponse.dto';

export class CartResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ type: () => ProductResponseDto, isArray: true })
  products: ProductResponseDto[];

  @ApiProperty({ example: 1 })
  numberOfProducts: number;

  @ApiProperty({ example: 799 })
  totalPrice: number;
}
