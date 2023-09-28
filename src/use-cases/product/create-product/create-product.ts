import { Product } from '../../../entities/product';
import { ProductRepository } from '../../../repositories/product-repository';
import { SaleRepository } from '../../../repositories/sale-repository';
import { ProductDTO } from '../product-DTO';

type CreateProductResponse = Product;

export class CreateProduct {
  constructor(
    private productRepository: ProductRepository,
    private saleRepository: SaleRepository
  ) {}

  async execute({
    id,
    name,
    amount,
    minimum,
    purchasePrice
  }: ProductDTO): Promise<CreateProductResponse> {
    const sale = await this.saleRepository.index();

    const salePrice = purchasePrice / sale.percentage;

    const product = new Product({
      id,
      name,
      amount,
      minimum,
      purchasePrice,
      salePrice
    });

    const productExists = await this.productRepository.findByName(product);

    if (productExists) {
      throw new Error('This product already exists');
    }

    await this.productRepository.create(product);

    return product;
  }
}
