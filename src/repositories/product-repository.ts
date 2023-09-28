import { Product } from '../entities/product';

export interface ProductRepository {
  create(product: Product): Promise<void>;
  findByName(product: Product): Promise<Product | undefined>;
  show(product: string): Promise<Product | undefined>;
  index(minimum?: boolean): Promise<Product[] | undefined>;
  update(product: Product): Promise<void>;
}
