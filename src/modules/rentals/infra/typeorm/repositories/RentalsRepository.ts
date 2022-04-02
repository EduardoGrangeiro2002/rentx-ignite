import { ICreateRentalsDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { IRepositoryRentals } from "@modules/rentals/repositories/IRepositoryRentals";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../Entities/Rentals";



class RentalsRepository implements IRepositoryRentals {
    private repositoryRentals: Repository<Rental>;
    constructor(){
        this.repositoryRentals = getRepository(Rental);
    }
    async findByUserId(user_id: string): Promise<Rental[]> {

      return await this.repositoryRentals.find({where: {user_id}, relations: ["car"]});
  }
      
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
      const openByCar = await this.repositoryRentals.findOne({ where: { car_id, end_date: null} })
      
      return openByCar
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
      const openByUser = await this.repositoryRentals.findOne({ where: { user_id, end_date: null } });
      
      return openByUser
    }
    async create({ car_id, expected_return_date, user_id, id, end_date, total  }: ICreateRentalsDTO): Promise<Rental> {
      const rental = this.repositoryRentals.create({ car_id, expected_return_date, user_id, end_date, id, total })
      
      await this.repositoryRentals.save(rental)
      
      return rental
    }

    async findById(id: string): Promise<Rental> {
      return await this.repositoryRentals.findOne(id);
    }
    
  }

  export { RentalsRepository }