"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalsController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRentalsUseCase = require("./CreateRentalsUseCase");

class CreateRentalsController {
  async handle(request, response) {
    const {
      car_id,
      expected_return_date
    } = request.body;
    const {
      id
    } = request.user;

    const createRentalsUseCase = _tsyringe.container.resolve(_CreateRentalsUseCase.CreateRentalUseCase);

    const rental = await createRentalsUseCase.execute({
      car_id,
      expected_return_date,
      user_id: id
    });
    return response.status(201).json(rental);
  }

}

exports.CreateRentalsController = CreateRentalsController;