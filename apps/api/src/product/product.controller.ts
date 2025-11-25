import { Product } from './interfaces/product.interface';
import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductRequestDto } from './dto/getProductRequest.dto';
import { ProductResponseDto } from './dto/productResponse.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('get')
  @ApiOkResponse({ type: ProductResponseDto, isArray: true })
  getProducts(@Query() query: GetProductRequestDto): Promise<Product[]> {
    return this.productService.getProducts(query);
  }
}
