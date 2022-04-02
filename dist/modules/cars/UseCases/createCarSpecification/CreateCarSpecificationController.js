"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationControler = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

class CreateCarSpecificationControler {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      specifications_id
    } = request.body;

    const createSpecificationCarUseCase = _tsyringe.container.resolve(_CreateCarSpecificationUseCase.CreateCarSpecificationUseCase);

    const specificationCars = await createSpecificationCarUseCase.execute({
      car_id: id,
      specifications_id
    });
    return response.status(201).json(specificationCars);
  }

}

exports.CreateCarSpecificationControler = CreateCarSpecificationControler;