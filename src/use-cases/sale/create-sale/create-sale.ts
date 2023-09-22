import { Sale } from '../../../entities/sale';
import { SaleRepository } from '../../../repositories/sale-repository';
import { SaleDTO } from '../sale-DTO';

type CreateSaleResponse = Sale;

export class CreateSale {
  constructor(private saleRepository: SaleRepository) {}

  async execute(data: SaleDTO): Promise<CreateSaleResponse> {
    data.percentage = 1 - data.percentage / 100;

    const sale = new Sale(data);

    await this.saleRepository.create(sale);

    return sale;
  }
}
