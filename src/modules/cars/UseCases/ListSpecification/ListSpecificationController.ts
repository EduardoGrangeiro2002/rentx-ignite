import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationUseCase } from "@modules/cars/UseCases/ListSpecification/ListSpecificationUseCase";

class ListSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationUseCase
    );

    const AllList = await listSpecificationUseCase.execute();

    return response.json(AllList);
  }
}

export { ListSpecificationController };
