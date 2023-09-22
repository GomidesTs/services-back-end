import { Request, Response } from 'express';
import { v1 as uuidv1 } from 'uuid';

import { CreateSale } from './create-sale';

export class CreateSaleController {
  constructor(private createSale: CreateSale) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { percentage } = request.body;
    const id = uuidv1();

    try {
      await this.createSale.execute({ id, percentage });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        message: error || 'Unexpected error'
      });
    }
  }
}
