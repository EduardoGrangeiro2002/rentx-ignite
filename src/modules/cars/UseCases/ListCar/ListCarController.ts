import { Car } from "@modules/cars/infra/typeorm/Entities/Car"
import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListCarUseCase } from "./ListCarUseCase"


class ListCarController {

    async handle(request: Request, response: Response): Promise<Response>{

        const { brand, category_id, name } = request.query
        const listCarUseCase = container.resolve(ListCarUseCase);

        const cars = await listCarUseCase.execute({
            name: brand as string, 
            category_id: category_id as string, 
            brand: name as string
        });

        return response.json(cars)

    }

}

export { ListCarController }