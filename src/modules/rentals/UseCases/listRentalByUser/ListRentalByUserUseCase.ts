import { Rental } from "@modules/rentals/infra/typeorm/Entities/Rentals";
import { IRepositoryRentals } from "@modules/rentals/repositories/IRepositoryRentals";
import { inject, injectable } from "tsyringe";


@injectable()
export class ListRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRepositoryRentals
  ){}
  async execute(id: string):Promise<Rental[]>{
    
    const rentals = await this.rentalsRepository.findByUserId(id);

    return rentals
  }
}