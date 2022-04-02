import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "./ListCategoriesUseCase";

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoryUseCase);
    const AllListCategories = await listCategoriesUseCase.execute();

    return response.json(AllListCategories);
  }
}

export { ListCategoryController };
