import { expect, test } from 'vitest';

import { Product } from './product';

test('Create an product', () => {
  const product = new Product({
    name: 'Product',
    amount: 5,
    minimum: 2,
    purchasePrice: 25.5,
    salePrice: 0
  });

  expect(product).toBeInstanceOf(Product);
  expect(product.name).equal('Product');
});
