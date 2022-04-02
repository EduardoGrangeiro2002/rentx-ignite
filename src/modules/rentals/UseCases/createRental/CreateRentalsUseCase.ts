import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/Entities/Rentals";
import { IRepositoryRentals } from "../../repositories/IRepositoryRentals"


interface IRequest {
  user_id: string;

  car_id: string;
  
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(

    @inject("RentalsRepository")
    private rentalsRepository: IRepositoryRentals,

    @inject("DayjsDateProvider")
    private dayjsDateProvider : IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository

  ){}
  async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental>{
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable) throw new AppError("car is unavailable!");

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if(rentalOpenToUser) throw new AppError("There's a rental in progress for user!")

    const dateNow = this.dayjsDateProvider.dateNow()

    const compare = this.dayjsDateProvider.compareInHours(dateNow, expected_return_date)

    if(compare < minimumHour)throw new AppError("Invalid return time, less than 24 hours!")

    const rentals = await this.rentalsRepository.create({car_id, expected_return_date, user_id});
  
    await this.carsRepository.updateCarAvailable(car_id, false)
    
    return rentals;
  }
}

export { CreateRentalUseCase }