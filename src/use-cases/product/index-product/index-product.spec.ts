import { v1 as uuidv1 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { InMemoryProductRepository } from '../../../repositories/in-memory/in-memory-product-repository';
import { InMemorySaleRepository } from '../../../repositories/in-memory/in-memory-sale-repository';
import { CreateSale } from '../../sale/create-sale/create-sale';
import { CreateProduct } from '../create-product/create-product';
import { IndexProduct } from './index-product';

describe('Index Product', () => {
  it('It should be possible to see all products', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const createSale = new CreateSale(saleRepository);
    const createProduct = new CreateProduct(productRepository, saleRepository);
    const indexProduct = new IndexProduct(productRepository);

    const id = uuidv1();
    const idProduct = uuidv1();
    const idProduct2 = uuidv1();
    const idProduct3 = uuidv1();

    await createSale.execute({
      id,
      percentage: 30
    });

    await createProduct.execute({
      id: idProduct,
      name: 'Product x',
      amount: 50,
      minimum: 10,
      purchasePrice: 1
    });

    await createProduct.execute({
      id: idProduct2,
      name: 'Product y',
      amount: 5,
      minimum: 10,
      purchasePrice: 50
    });

    await createProduct.execute({
      id: idProduct3,
      name: 'Product z',
      amount: 213,
      minimum: 35,
      purchasePrice: 71
    });

    const product = await indexProduct.execute();

    expect(product).toBeInstanceOf(Array);
    expect(product?.length).toBeGreaterThan(0);
  });

  it('It should be possible to see all products that contain the quantity below the minimum', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const createSale = new CreateSale(saleRepository);
    const createProduct = new CreateProduct(productRepository, saleRepository);
    const indexProduct = new IndexProduct(productRepository);

    const id = uuidv1();
    const idProduct = uuidv1();
    const idProduct2 = uuidv1();
    const idProduct3 = uuidv1();

    await createSale.execute({
      id,
      percentage: 30
    });

    await createProduct.execute({
      id: idProduct,
      name: 'Product x',
      amount: 50,
      minimum: 10,
      purchasePrice: 1
    });

    await createProduct.execute({
      id: idProduct2,
      name: 'Product y',
      amount: 5,
      minimum: 10,
      purchasePrice: 50
    });

    await createProduct.execute({
      id: idProduct3,
      name: 'Product z',
      amount: 213,
      minimum: 35,
      purchasePrice: 71
    });

    const product = await indexProduct.execute(true);

    expect(product).toBeInstanceOf(Array);
    expect(product?.length).toBeGreaterThan(0);
  });
});
