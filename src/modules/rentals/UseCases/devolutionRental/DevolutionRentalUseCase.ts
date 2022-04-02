import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/Entities/Rentals";
import { IRepositoryRentals } from "@modules/rentals/repositories/IRepositoryRentals";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";

type Request = {
    id: string;

    user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRepositoryRentals,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider : IDateProvider, 
  ){}

  async execute({ id, user_id }: Request): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const minumum_daily = 1;

    if(!rental) throw new AppError("Rental does not exists")

    const car = await this.carsRepository.findById(rental.car_id)

    const dateNow =  this.dayjsDateProvider.dateNow();

    let daily = this.dayjsDateProvider.compareInDays(rental.start_date, dateNow);

    if(daily <= 0){
      daily = minumum_daily;
    }

    const delay = this.dayjsDateProvider.compareInDays(dateNow, rental.expected_return_date);

    let total = 0;

    if(delay > 0){
      const calculate_fine = delay * car.fine_amount

      total = calculate_fine
    }

    total += car.daily_rate * daily;

    rental.end_date = this.dayjsDateProvider.dateNow()
    rental.total = total;

    await this.rentalsRepository.create(rental);

    await this.carsRepository.updateCarAvailable(rental.car_id, true);

    return rental
  }
}