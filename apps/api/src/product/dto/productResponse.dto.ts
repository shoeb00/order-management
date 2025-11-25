import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class ProductResponseDto {
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiProperty({ example: 1 })
  id: number;

  @IsString()
  @ApiProperty({ example: 'Wireless Mouse' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'A wireless mouse for your convenience' })
  description: string;

  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsNumber()
  @ApiProperty({ example: 799 })
  price: number;

  @IsString()
  @ApiProperty({ example: 'Electronics' })
  category: string;

  @Min(0)
  @Max(1000)
  @IsNumber()
  @ApiProperty({ example: 1 })
  quantity: number;
}
