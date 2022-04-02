import { getRepository, Repository } from "typeorm";

import { Category } from "@modules/cars/infra/typeorm/Entities/Category";
import {
  ICategoryRepositoryInterface,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepositoryInterface";

class CategoriesRepository implements ICategoryRepositoryInterface {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    // Select * from categories where name = "name" limit 1'
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
