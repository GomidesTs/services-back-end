import { v1 as uuidv1 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { Product } from '../../../entities/product';
import { InMemoryProductRepository } from '../../../repositories/in-memory/in-memory-product-repository';
import { InMemorySaleRepository } from '../../../repositories/in-memory/in-memory-sale-repository';
import { CreateSale } from '../../sale/create-sale/create-sale';
import { CreateProduct } from '../create-product/create-product';
import { UpdateProduct } from './update-product';

describe('Update Product', () => {
  it('should update a product', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const createProduct = new CreateProduct(productRepository, saleRepository);
    const createSale = new CreateSale(saleRepository);
    const updateProduct = new UpdateProduct(productRepository, saleRepository);

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

    expect(
      await updateProduct.execute({
        id: idProduct,
        name: 'Product y',
        amount: 50,
        minimum: 30,
        purchasePrice: 1
      })
    ).toEqual(
      new Product({
        id: idProduct,
        name: 'Product y',
        amount: 50,
        minimum: 30,
        purchasePrice: 1,
        salePrice: 1.4285714285714286
      })
    );
  });

  it('should not update a product', async () => {
    const productRepository = new InMemoryProductRepository();
    const saleRepository = new InMemorySaleRepository();
    const createProduct = new CreateProduct(productRepository, saleRepository);
    const createSale = new CreateSale(saleRepository);
    const updateProduct = new UpdateProduct(productRepository, saleRepository);

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
      updateProduct.execute({
        id: idProduct2,
        name: 'Product y',
        amount: 50,
        minimum: 30,
        purchasePrice: 1
      })
    ).rejects.toThrow();
  });
});
