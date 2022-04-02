import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/Entities/Specification";
import {
  ISpecificatiosRepository,
  ICreateSpecificatiosDTO,
} from "@modules/cars/repositories/ISpecificatiosRepository";

class SpecificationRepository implements ISpecificatiosRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids);
  }

  async create({ name, description }: ICreateSpecificatiosDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

  return await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
  async list(): Promise<Specification[]> {
    const Specifications = await this.repository.find();
    return Specifications;
  }
}
export { SpecificationRepository };
