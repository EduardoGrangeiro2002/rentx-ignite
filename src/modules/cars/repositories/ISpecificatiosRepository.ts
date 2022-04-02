import { Specification } from "@modules/cars/infra/typeorm/Entities/Specification";

interface ICreateSpecificatiosDTO {
  name: string;
  description: string;
}

interface ISpecificatiosRepository {
  create({ name, description }: ICreateSpecificatiosDTO): Promise<Specification>;

  findByName(name: string): Promise<Specification>;

  list(): Promise<Specification[]>;

  findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificatiosRepository, ICreateSpecificatiosDTO };
