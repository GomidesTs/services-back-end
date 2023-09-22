import { Request, Response } from 'express';

import { IndexSale } from './index-sale';

export class IndexSaleController {
  constructor(private indexSale: IndexSale) {}

  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const percentage = await this.indexSale.execute();

      return response.status(200).send(percentage);
    } catch (error) {
      return response.status(404).json({
        message: error || 'Unexpected error'
      });
    }
  }
}
