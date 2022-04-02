import { Category } from "@modules/cars/infra/typeorm/Entities/Category";
import {
  ICategoryRepositoryInterface,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepositoryInterface";

class CategoriesRepositoryInMemory implements ICategoryRepositoryInterface {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const Category = this.categories.find((category) => category.name === name);
    return Category;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
}

export { CategoriesRepositoryInMemory };
