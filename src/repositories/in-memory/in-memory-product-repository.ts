import { Product } from '../../entities/product';
import { ProductRepository } from '../product-repository';

export class InMemoryProductRepository implements ProductRepository {
  private items: Product[] = [];

  async create(product: Product): Promise<void> {
    this.items.push(product);
  }

  async findByName(product: Product): Promise<Product | undefined> {
    return this.items.find((item) => item.name === product.name);
  }

  async show(product: string): Promise<Product | undefined> {
    return this.items.find(
      (item) => item.name === product || item.id === product
    );
  }

  async index(minimum?: boolean): Promise<Product[] | undefined> {
    if (minimum) {
      return this.items.filter((item) => item.amount <= item.minimum);
    }

    return this.items;
  }

  async update(product: Product): Promise<void> {
    this.items.push(product);
  }
}
