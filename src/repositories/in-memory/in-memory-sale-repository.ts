import { Sale } from '../../entities/sale';
import { SaleRepository } from '../sale-repository';

export class InMemorySaleRepository implements SaleRepository {
  private items: Sale[] = [];

  async create(sale: Sale): Promise<void> {
    this.items.push(sale);
  }

  async index(): Promise<Sale> {
    return this.items[0];
  }

  async update(sale: Sale): Promise<void> {
    const index = this.items.findIndex((item) => item.id === sale.id);

    if (index !== -1) {
      this.items[index] = sale;
    } else {
      throw new Error(`Sale with ID ${sale.id} not found.`);
    }
  }
}
