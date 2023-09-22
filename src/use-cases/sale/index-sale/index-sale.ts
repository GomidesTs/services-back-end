import { Sale } from '../../../entities/sale';
import { SaleRepository } from '../../../repositories/sale-repository';

type IndexSaleResponse = Sale;

export class IndexSale {
  constructor(private saleRepository: SaleRepository) {}

  async execute(): Promise<IndexSaleResponse> {
    return await this.saleRepository.index();
  }
}
