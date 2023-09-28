import { v1 as uuidv1 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { Product } from '../../../entities/product';
import { InMemoryProductRepository } from '../../../repositories/in-memory/in-memory-product-repository';
import { InMemorySaleRepository } from '../../../repositories/in-memory/in-memory-sale-repository';
import { CreateSale } from '../../sale/create-sale/create-sale';
import { CreateProduct } from './create-product';

describe('Create Product', () => {
  it('should be able to create an product', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const createProduct = new CreateProduct(productRepository, saleRepository);
    const createSale = new CreateSale(saleRepository);

    const id = uuidv1();
    const idProduct = uuidv1();

    await createSale.execute({
      id,
      percentage: 30
    });

    expect(
      await createProduct.execute({
        id: idProduct,
        name: 'Product x',
        amount: 50,
        minimum: 10,
        purchasePrice: 1
      })
    ).toBeInstanceOf(Product);
  });

  it('should not be able to create a product with the same name', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const createProduct = new CreateProduct(productRepository, saleRepository);

    const createSale = new CreateSale(saleRepository);

    const id = uuidv1();
    const idProduct = uuidv1();
    const idProduct2 = uuidv1();

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

    try {
      await createProduct.execute({
        id: idProduct2,
        name: 'Product x',
        amount: 50,
        minimum: 10,
        purchasePrice: 1
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.message).toBe('This product already exists');
    }
  });

  it('shonul be able to create a product with a different name', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const createProduct = new CreateProduct(productRepository, saleRepository);

    const createSale = new CreateSale(saleRepository);

    const id = uuidv1();
    const idProduct = uuidv1();
    const idProduct2 = uuidv1();

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

    expect(
      createProduct.execute({
        id: idProduct2,
        name: 'Product y',
        amount: 50,
        minimum: 10,
        purchasePrice: 1
      })
    ).resolves.toBeInstanceOf(Product);
  });
});
