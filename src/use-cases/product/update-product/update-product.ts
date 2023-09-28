import { Product } from '../../../entities/product';
import { ProductRepository } from '../../../repositories/product-repository';
import { SaleRepository } from '../../../repositories/sale-repository';
import { ProductDTO } from '../product-DTO';

type UpdateProductRequest = Product;

export class UpdateProduct {
  constructor(
    private productRepository: ProductRepository,
    private saleRepository: SaleRepository
  ) {}

  async execute({
    amount,
    id,
    minimum,
    name,
    purchasePrice
  }: ProductDTO): Promise<UpdateProductRequest> {
    const sale = await this.saleRepository.index();

    const productExists = await this.productRepository.show(id);

    if (productExists && purchasePrice < productExists.purchasePrice) {
      purchasePrice = productExists.purchasePrice;
    }

    const salePrice = purchasePrice / sale.percentage;

    if (productExists) {
      const product = new Product({
        id,
        name,
        amount,
        minimum,
        purchasePrice,
        salePrice
      });

      await this.productRepository.update(product);

      return product;
    }

    throw new Error('This product not found');
  }
}
