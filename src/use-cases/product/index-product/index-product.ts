import { Product } from '../../../entities/product';
import { ProductRepository } from '../../../repositories/product-repository';

type IndexProductRequest = Product[] | undefined;

export class IndexProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(minimum?: boolean): Promise<IndexProductRequest> {
    return await this.productRepository.index(minimum);
  }
}
