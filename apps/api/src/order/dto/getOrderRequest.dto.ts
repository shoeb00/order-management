import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min, Max } from 'class-validator';

export class GetOrderRequestDto {
  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  userId?: number = 0;

  @ApiPropertyOptional({ default: 0 })
  @Type(() => Number)
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  offset?: number = 0;

  @ApiPropertyOptional({ default: 10 })
  @Type(() => Number)
  @Min(1)
  @Max(500)
  limit?: number = 10;
}
