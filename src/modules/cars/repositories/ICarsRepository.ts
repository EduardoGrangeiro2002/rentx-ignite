import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/Entities/Car";

interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;

  FinAllCarsAvaliable(name?: string, category_id?: string, brand?: string):Promise<Car[]>

  findByLicense_plate(license_plate: string):Promise<Car>

  findById(id: string): Promise<Car>;

  updateCarAvailable(id: string, available: boolean): Promise<void>
}

export { ICarsRepository };
