import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/Entities/Specification";
import { ISpecificatiosRepository } from "@modules/cars/repositories/ISpecificatiosRepository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificatiosRepository
  ) {}
  async execute(): Promise<Specification[]> {
    const ListSpecification = await this.specificationRepository.list();

    return ListSpecification;
  }
}

export { ListSpecificationUseCase };
