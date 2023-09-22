import { v1 as uuidv1 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { Sale } from '../../../entities/sale';
import { InMemorySaleRepository } from '../../../repositories/in-memory/in-memory-sale-repository';
import { CreateSale } from '../create-sale/create-sale';
import { UpdateSale } from './update-sale';

describe('Create Sale', () => {
  it('should be able to update an sale', () => {
    const saleRepository = new InMemorySaleRepository();
    const createSale = new CreateSale(saleRepository);
    const updateSale = new UpdateSale(saleRepository);
    const id = uuidv1();

    createSale.execute({
      id,
      percentage: 30
    });

    expect(updateSale.execute({ id, percentage: 40 })).resolves.toEqual(
      new Sale({ id, percentage: 0.6 })
    );
  });

  it('should not be able to update with different id', () => {
    const saleRepository = new InMemorySaleRepository();
    const createSale = new CreateSale(saleRepository);
    const updateSale = new UpdateSale(saleRepository);
    const id = uuidv1();
    const id2 = uuidv1();

    createSale.execute({
      id,
      percentage: 30
    });

    expect(updateSale.execute({ id: id2, percentage: 80 })).rejects.toThrow();
  });
});
