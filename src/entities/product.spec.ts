import { expect, test } from 'vitest';

import { Product } from './product';

test('Create an product', () => {
  const product = new Product({
    id: '676f6d69646573206d6f746f726573',
    name: 'Product',
    amount: 5,
    minimum: 2,
    purchasePrice: 25.5,
    salePrice: 0
  });

  expect(product).toBeInstanceOf(Product);
});
