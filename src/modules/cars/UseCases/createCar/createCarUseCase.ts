import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/error/AppError";
import { Car } from "@modules/cars/infra/typeorm/Entities/Car";

interface IRequest {
  name: string;

  description: string;
  
  daily_rate: number;
  
  license_plate: string;
  
  fine_amount: number;
  
  brand: string;
  
  category_id: string;
  }

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {

    const carAlreadyExists = await this.carsRepository.findByLicense_plate(license_plate);

    if(carAlreadyExists){
      throw new AppError("Car already exist")
    }

    const car = await this.carsRepository.create({
                    name, 
                    description, 
                    daily_rate, 
                    brand, 
                    category_id,
                    fine_amount,
                    license_plate
    })
    return car;
  }
}

export { CreateCarUseCase };
