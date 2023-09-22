import { v1 as uuidv1 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { Sale } from '../../../entities/sale';
import { InMemorySaleRepository } from '../../../repositories/in-memory/in-memory-sale-repository';
import { CreateSale } from '../create-sale/create-sale';
import { IndexSale } from './index-sale';

describe('Create Sale', () => {
  it('should be able to create an product', () => {
    const saleRepository = new InMemorySaleRepository();

    const createSale = new CreateSale(saleRepository);
    const indexSale = new IndexSale(saleRepository);
    const id = uuidv1();

    createSale.execute({
      id,
      percentage: 30
    });

    expect(indexSale.execute()).resolves.toEqual(
      new Sale({ id, percentage: 0.7 })
    );
  });
});
