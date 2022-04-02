import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";



export class DevolutionRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const devolutionRentalsUseCase = container.resolve(DevolutionRentalUseCase);

    const rentalDevolution = await devolutionRentalsUseCase.execute({id, user_id});

    return response.status(201).json(rentalDevolution);
 }
}