import { Category } from "@modules/cars/infra/typeorm/Entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepositoryInterface {
  findByName(name: string): Promise<Category>;

  create({ name, description }: ICreateCategoryDTO): Promise<void>;

  list(): Promise<Category[]>;
}

export { ICategoryRepositoryInterface, ICreateCategoryDTO };
