import { Product } from '../../../entities/product';
import { ProductRepository } from '../../../repositories/product-repository';

type ShowProductResponse = Product;

export class ShowProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(product: string): Promise<ShowProductResponse> {
    const productExists = await this.productRepository.show(product);

    if (productExists) {
      return productExists;
    }

    throw new Error('This product does not exist');
  }
}
