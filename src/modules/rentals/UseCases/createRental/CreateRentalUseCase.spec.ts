import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/error/AppError";
import { RepositoryRentalsInMemory } from "../../repositories/implementations/RepositoryRentalsInMemory";
import { CreateRentalUseCase } from "./CreateRentalsUseCase"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";


let createRentalUseCase: CreateRentalUseCase;
let repositoryRentalsInMemory: RepositoryRentalsInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepository: CarsRepositoryInMemory

describe("Create rental", () => {
    const dayAdd24h = dayjs().add(1, "day").toDate()
    beforeEach(() => {
        repositoryRentalsInMemory = new RepositoryRentalsInMemory()
        dayjsDateProvider = new DayjsDateProvider()
        carsRepository = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(repositoryRentalsInMemory, dayjsDateProvider, carsRepository);
    });
    
    it("Should be able to create a rental", async () => {
      const car = await carsRepository.create({
        name: "Test",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "test",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand",
      });

        const rental = await createRentalUseCase.execute({
            car_id: car.id, 
            expected_return_date: dayAdd24h, 
            user_id: "321445"
        })


        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("Should not be able to create a new rental if there is another open to the same user ", async () => 
    {
        const car = await carsRepository.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        })

        await createRentalUseCase.execute({
          car_id: car.id, 
          expected_return_date: dayAdd24h, 
          user_id: "321445"
      })
        await expect(
          createRentalUseCase.execute({
            car_id: "test", 
            expected_return_date: dayAdd24h, 
            user_id: "321445"
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })

  it("Should not be able to create a new rental if there is another open to the same car ", async () => 
  {
    await repositoryRentalsInMemory.create({
      car_id: "1234Abc",
      expected_return_date: dayAdd24h,
      user_id: "12345",
    });
      await expect(

         createRentalUseCase.execute({
          car_id: "1234Abc", 
          expected_return_date: dayAdd24h, 
          user_id: "321"
    })
  ).rejects.toEqual(new AppError("car is unavailable!"));
  
 });
 it("Should not be able to create a new rental with invalid return time ", async () => 
 {
     await expect(
      createRentalUseCase.execute({
         car_id: "1234Abc", 
         expected_return_date: dayjs().toDate(), 
         user_id: "XXX"
     })
  
    ).rejects.toEqual(new AppError("Invalid return time, less than 24 hours!"));
  })
})