import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/Entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  async updateCarAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }
  
  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }


  cars: Car[] = [];
  
  async create({
    name, 
    brand, 
    category_id, 
    daily_rate, 
    description, 
    fine_amount, 
    license_plate,
    id
  }: ICreateCarsDTO): Promise<Car> {
      const car = new Car();
      Object.assign(car, {
        name, 
        brand, 
        category_id, 
        daily_rate, 
        description, 
        fine_amount, 
        license_plate,
        id
      })
      this.cars.push(car);

      return car

  }

  async findByLicense_plate(license_plate: string): Promise<Car> {

   return this.cars.find(car => car.license_plate === license_plate);
  }

  async  FinAllCarsAvaliable(name: string, category_id: string, brand: string): Promise<Car[]> {

    const avaliableCars = this.cars.filter((avaliableCars) => avaliableCars.available === true)

    const queryCars = avaliableCars.filter(
      car =>
      (name && car.name === name) ||
      (brand && car.brand === brand) ||
      (category_id && car.category_id === category_id)
    )

    
    return queryCars.length ? queryCars : avaliableCars; 
  }

}
export { CarsRepositoryInMemory };
