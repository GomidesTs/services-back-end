import { v1 as uuidv1 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { Product } from '../../../entities/product';
import { InMemoryProductRepository } from '../../../repositories/in-memory/in-memory-product-repository';
import { InMemorySaleRepository } from '../../../repositories/in-memory/in-memory-sale-repository';
import { CreateSale } from '../../sale/create-sale/create-sale';
import { CreateProduct } from '../create-product/create-product';
import { ShowProduct } from './show-product';

describe('show product', () => {
  it('should be able to search for a product by id', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const showProduct = new ShowProduct(productRepository);
    const createSale = new CreateSale(saleRepository);
    const createProduct = new CreateProduct(productRepository, saleRepository);

    const id = uuidv1();
    const idProduct = uuidv1();

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

    expect(await showProduct.execute(idProduct)).toEqual(
      new Product({
        id: idProduct,
        name: 'Product x',
        amount: 50,
        minimum: 10,
        purchasePrice: 1,
        salePrice: 1.4285714285714286
      })
    );
  });

  it('should not be able to search for a product by different ID', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const showProduct = new ShowProduct(productRepository);
    const createSale = new CreateSale(saleRepository);
    const createProduct = new CreateProduct(productRepository, saleRepository);

    const id = uuidv1();
    const idProduct = uuidv1();

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
      await showProduct.execute(uuidv1());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.message).toBe('This product does not exist');
    }
  });

  it('should be able to search for a product by name', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const showProduct = new ShowProduct(productRepository);
    const createSale = new CreateSale(saleRepository);
    const createProduct = new CreateProduct(productRepository, saleRepository);

    const id = uuidv1();
    const idProduct = uuidv1();
    const name = 'Product x';

    await createSale.execute({
      id,
      percentage: 30
    });

    await createProduct.execute({
      id: idProduct,
      name,
      amount: 50,
      minimum: 10,
      purchasePrice: 1
    });

    expect(await showProduct.execute(name)).toEqual(
      new Product({
        id: idProduct,
        name,
        amount: 50,
        minimum: 10,
        purchasePrice: 1,
        salePrice: 1.4285714285714286
      })
    );
  });

  it('should not be able to search for a product by different name', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const showProduct = new ShowProduct(productRepository);
    const createSale = new CreateSale(saleRepository);
    const createProduct = new CreateProduct(productRepository, saleRepository);

    const id = uuidv1();
    const idProduct = uuidv1();
    const name = 'Product x';

    await createSale.execute({
      id,
      percentage: 30
    });

    await createProduct.execute({
      id: idProduct,
      name,
      amount: 50,
      minimum: 10,
      purchasePrice: 1
    });

    try {
      await showProduct.execute('Product y');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.message).toBe('This product does not exist');
    }
  });
});
