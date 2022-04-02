import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/error/AppError";

import { ICategoryRepositoryInterface } from "../../repositories/ICategoriesRepositoryInterface";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCases {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepositoryInterface
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    await this.categoriesRepository.create({ description, name });
  }
}

export { CreateCategoryUseCases };
