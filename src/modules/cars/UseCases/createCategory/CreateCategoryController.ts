import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCases } from "@modules/cars/UseCases/createCategory/CreateCategoryUseCases";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCases);

    await createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
