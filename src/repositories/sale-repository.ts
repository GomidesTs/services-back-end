import { Sale } from '../entities/sale';

export interface SaleRepository {
  create(sale: Sale): Promise<void>;
  index(): Promise<Sale>;
  update(sale: Sale): Promise<void>;
}
