import { ICreateRentalsDTO } from "../dtos/ICreateRentalsDTO";
import { Rental } from "../infra/typeorm/Entities/Rentals";



export interface IRepositoryRentals {
    findOpenRentalByCar(car_id: string): Promise<Rental>
    
    findOpenRentalByUser(user_id: string): Promise<Rental>

    create({ car_id, expected_return_date, user_id, id, end_date, total  }: ICreateRentalsDTO): Promise<Rental>

    findById(id: string): Promise<Rental>;

    findByUserId(user_id: string): Promise<Rental[]>
}