import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";



class CreateCarSpecificationControler {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params  
    const { specifications_id } = request.body
    const createSpecificationCarUseCase = container.resolve(CreateCarSpecificationUseCase);

    const specificationCars = await createSpecificationCarUseCase.execute({car_id:id, specifications_id});
    
    return response.status(201).json(specificationCars);
  }    
}

export { CreateCarSpecificationControler }