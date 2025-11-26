import { Product } from 'src/product/interfaces/product.interface';

export interface Order {
  id: number;
  products: Product[];
  quantity: number;
  totalPrice: number;
  userId: number;
  discountedAmount: number;
}
