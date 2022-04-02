import { inject, injectable } from "tsyringe";

import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificatiosRepository } from "@modules/cars/repositories/ISpecificatiosRepository";
import { AppError } from "@shared/error/AppError";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificatiosRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const repo = new SpecificationRepository();

    const specificationAlreadyExist = await repo.findByName(name);
    if (specificationAlreadyExist) {
      throw new AppError("Specification already exist");
    }
    this.specificationRepository.create({ description, name });
  }
}

export { CreateSpecificationUseCase };
