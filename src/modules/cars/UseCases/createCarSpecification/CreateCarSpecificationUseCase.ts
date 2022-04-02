import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificatiosRepository } from "@modules/cars/repositories/ISpecificatiosRepository";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_id: string[];
} 


@injectable()
 class CreateCarSpecificationUseCase {
     constructor(
         @inject("CarsRepository")
         private carsRepositories: ICarsRepository,
         
         @inject("SpecificationsRepository")
         private specificationRepository: ISpecificatiosRepository
     ){}
    async execute({car_id, specifications_id}: IRequest){
      const carsExists = await this.carsRepositories.findById(car_id);
    
      if(!carsExists)throw new AppError("Cars does not exists")

      const specification = await this.specificationRepository.findByIds(specifications_id);
      carsExists.specification = specification;

      await this.carsRepositories.create(carsExists);  
      return carsExists
    }
 }

 export { CreateCarSpecificationUseCase }