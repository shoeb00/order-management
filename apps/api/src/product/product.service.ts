import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GetProductRequestDto } from './dto/getProductRequest.dto';
import { DATABASE } from 'src/database/token';
import { Database } from 'src/database/interfaces/database.interface';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}
  async getProducts(request: GetProductRequestDto): Promise<Product[]> {
    let result = this.db.products;
    if (request.name)
      result = result.filter((product) => product.name.includes(request.name));
    if (result.length === 0) throw new BadRequestException('Product not found');
    result = result.slice(request.offset, request.offset + request.limit);
    return result;
  }
}
