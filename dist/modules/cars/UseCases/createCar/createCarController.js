"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _createCarUseCase = require("./createCarUseCase");

var _Car = require("@modules/cars/infra/typeorm/Entities/Car");

class CreateCarController {
  async handle(request, response) {
    const {
      name,
      description,
      daily_rate,
      brand,
      fine_amount,
      license_plate,
      category_id
    } = request.body;

    const createCarUseCase = _tsyringe.container.resolve(_createCarUseCase.CreateCarUseCase);

    const car = createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });
    return response.status(201).json(_Car.Car);
  }

}

exports.CreateCarController = CreateCarController;