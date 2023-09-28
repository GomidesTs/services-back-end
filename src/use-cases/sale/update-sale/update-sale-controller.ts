import { Request, Response } from 'express';

import { UpdateSale } from './update-sale';

export class UpdateSaleController {
  constructor(private updateSale: UpdateSale) {}

  async execute(request: Request, response: Response) {
    const sale = request.body;

    try {
      await this.updateSale.execute(sale);

      return response.status(200).send();
    } catch (error) {
      response.status(204).json({
        message: error || 'Unexpected error'
      });
    }
  }
}
