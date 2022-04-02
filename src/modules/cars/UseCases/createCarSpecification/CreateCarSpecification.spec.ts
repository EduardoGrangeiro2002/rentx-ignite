import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/error/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepository: CarsRepositoryInMemory
let specificationRepository: SpecificationRepositoryInMemory
describe("Create Car Specificatoin", ()=> {
    beforeEach(()=>{
        carsRepository = new CarsRepositoryInMemory()
        specificationRepository = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationRepository)
    })
    it("Should not be able to add a new specification to a now-existent car", async () => {
      const specifications_id = ["54321"]
      const car_id = "1234"  
      await expect(
           createCarSpecificationUseCase.execute({car_id, specifications_id})
        ).rejects.toEqual(new AppError("Cars does not exists"));
      });

    it("Should be able to add a new specification to the car", async () => {
      const specification = await specificationRepository.create({name: "Super sport", description: "Carro veloz"})
      
      const specifications_id = [specification.id]
      const car = await carsRepository.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
          });
          const specificationCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})
            expect(specificationCars).toHaveProperty("specification");
            expect(specificationCars.specification.length).toBe(1);

    })

})