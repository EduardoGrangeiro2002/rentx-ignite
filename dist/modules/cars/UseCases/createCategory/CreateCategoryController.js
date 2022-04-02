"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCategoryUseCases = require("@modules/cars/UseCases/createCategory/CreateCategoryUseCases");

class CreateCategoryController {
  async handle(request, response) {
    const {
      name,
      description
    } = request.body;

    const createCategoryUseCase = _tsyringe.container.resolve(_CreateCategoryUseCases.CreateCategoryUseCases);

    await createCategoryUseCase.execute({
      name,
      description
    });
    return response.status(201).send();
  }

}

exports.CreateCategoryController = CreateCategoryController;