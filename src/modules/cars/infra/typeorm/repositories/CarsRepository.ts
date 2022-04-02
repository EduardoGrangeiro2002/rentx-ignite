import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../Entities/Car";



class CarsRepository implements ICarsRepository{

    private repository: Repository<Car>
    constructor(){
        this.repository = getRepository(Car)
    }
    async updateCarAvailable(id: string, available: true): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({available})
        .where("id = :id")
        .setParameters({id})
        .execute();
    }
async  findById(id: string): Promise<Car> {
    return await this.repository.findOne(id)
    }
   
async create({brand, category_id, daily_rate, description, fine_amount, license_plate, name, specification, id}: ICreateCarsDTO): Promise<Car> {

    const car = this.repository.create({
        brand, 
        daily_rate, 
        description, 
        fine_amount, 
        license_plate, 
        name, 
        category_id,
        specification,
        id
    })

    await this.repository.save(car)

    return car;
    }
async findByLicense_plate(license_plate: string): Promise<Car> {
        
        const car = await this.repository.findOne({
             license_plate
             });
        
        return car

    }

    async FinAllCarsAvaliable(name?: string, category_id?: string, brand?: string): Promise<Car[]> {
            const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", {available: true})

            
            if(name){
                carsQuery.andWhere("c.name = :name", { name })
            }
            if(category_id){
                carsQuery.andWhere("c.category_id = :category_id", { category_id })
            }

            if(brand){
                carsQuery.andWhere("c.brand = :brand", { brand })
            }

            const cars = await carsQuery.getMany()
            
            return cars
                
        }
}

export { CarsRepository }