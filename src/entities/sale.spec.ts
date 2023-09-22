import { v1 as uuidv1 } from 'uuid';
import { expect, test } from 'vitest';

import { Sale } from './sale';

test('Create an sale', () => {
  const id = uuidv1();
  const sale = new Sale({
    id,
    percentage: 30
  });

  expect(sale).toBeInstanceOf(Sale);
  expect(sale.percentage).equal(30);
});
