"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalsController = void 0;

var _tsyringe = require("tsyringe");

var _DevolutionRentalUseCase = require("./DevolutionRentalUseCase");

class DevolutionRentalsController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      id: user_id
    } = request.user;

    const devolutionRentalsUseCase = _tsyringe.container.resolve(_DevolutionRentalUseCase.DevolutionRentalUseCase);

    const rentalDevolution = await devolutionRentalsUseCase.execute({
      id,
      user_id
    });
    return response.status(201).json(rentalDevolution);
  }

}

exports.DevolutionRentalsController = DevolutionRentalsController;