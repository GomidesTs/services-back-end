import { Request, Response } from 'express';

import { CreateProduct } from './create-product';

export class CreateProductController {
  constructor(private createProduct: CreateProduct) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const product = request.body;

    try {
      await this.createProduct.execute(product);

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        message: error || 'Unexpected error'
      });
    }
  }
}
