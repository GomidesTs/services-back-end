import { Request, Response } from 'express';

import { ShowProduct } from './show-product';

export class ShowProductController {
  constructor(private showProduct: ShowProduct) {}

  async execute(request: Request, response: Response) {
    const search = request.body;

    try {
      const product = await this.showProduct.execute(search);

      return response.status(200).json({ product });
    } catch (error) {
      return response.status(204).json({
        message: error || 'Unexpected error'
      });
    }
  }
}
