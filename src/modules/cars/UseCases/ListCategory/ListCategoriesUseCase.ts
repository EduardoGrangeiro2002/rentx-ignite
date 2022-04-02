import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/Entities/Category";
import { ICategoryRepositoryInterface } from "@modules/cars/repositories/ICategoriesRepositoryInterface";

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepositoryInterface
  ) {}
  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoryUseCase };
