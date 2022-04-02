import { Car } from "@modules/cars/infra/typeorm/Entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
}

@injectable()
class ListCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}
    async execute({brand, category_id, name}: IRequest):Promise<Car[]>{
        const cars = await this.carsRepository.FinAllCarsAvaliable(brand, category_id, name)
        
        return cars
    }

}

export { ListCarUseCase }