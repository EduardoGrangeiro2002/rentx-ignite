"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarController = void 0;

var _tsyringe = require("tsyringe");

var _ListCarUseCase = require("./ListCarUseCase");

class ListCarController {
  async handle(request, response) {
    const {
      brand,
      category_id,
      name
    } = request.query;

    const listCarUseCase = _tsyringe.container.resolve(_ListCarUseCase.ListCarUseCase);

    const cars = await listCarUseCase.execute({
      name: brand,
      category_id: category_id,
      brand: name
    });
    return response.json(cars);
  }

}

exports.ListCarController = ListCarController;