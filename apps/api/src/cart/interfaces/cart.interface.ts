import { Product } from 'src/product/interfaces/product.interface';

export interface Cart {
  id: number;
  userId: number;
  products: Product[];
  numberOfProducts: number;
  totalPrice: number;
}
