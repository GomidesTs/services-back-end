import { Sale } from '../../../entities/sale';
import { SaleRepository } from '../../../repositories/sale-repository';
import { SaleDTO } from '../sale-DTO';

type UpdateSaleResponse = Sale;

export class UpdateSale {
  constructor(private saleRepository: SaleRepository) {}
  async execute(data: SaleDTO): Promise<UpdateSaleResponse> {
    data.percentage = 1 - data.percentage / 100;

    const sale = new Sale(data);

    await this.saleRepository.update(sale);

    return sale;
  }
}
