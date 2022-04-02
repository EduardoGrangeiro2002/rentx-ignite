import { container } from "tsyringe"
import { CreateCarUseCase } from "./createCarUseCase"
import { Request, response, Response } from "express"
import { Car } from "@modules/cars/infra/typeorm/Entities/Car"



class CreateCarController {

    async handle(request: Request, response: Response): Promise<Response>{

        const {name, description, daily_rate, brand,fine_amount, license_plate, category_id } = request.body
        
        const createCarUseCase = container.resolve(CreateCarUseCase)

        const car =  createCarUseCase.execute({brand, category_id, daily_rate, description, fine_amount, license_plate, name})

        return response.status(201).json(Car)
    }
}
export { CreateCarController }