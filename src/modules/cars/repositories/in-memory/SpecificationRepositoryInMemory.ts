import { Specification } from "@modules/cars/infra/typeorm/Entities/Specification";
import { ICreateSpecificatiosDTO, ISpecificatiosRepository } from "../ISpecificatiosRepository";



class SpecificationRepositoryInMemory implements ISpecificatiosRepository {
  async findByIds(ids: string[]): Promise<Specification[]> {
      const allSpecifications = this.specification.filter(specifications => 
        ids.includes(specifications.id));
      return allSpecifications
    }
    specification: Specification[] = []

  async create({ name, description }: ICreateSpecificatiosDTO): Promise<Specification> {
    const car = new Specification();
    Object.assign(car, {
        name, description
    });
    const cars = this.specification.push(car);
    
    return car
    }

  async findByName(name: string): Promise<Specification> {
    return this.specification.find(specifications => specifications.name === name )
    
    }
  async list(): Promise<Specification[]> {
    return this.specification
    }

}

export { SpecificationRepositoryInMemory }