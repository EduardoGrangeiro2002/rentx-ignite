"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _ListSpecificationUseCase = require("@modules/cars/UseCases/ListSpecification/ListSpecificationUseCase");

class ListSpecificationController {
  async handle(request, response) {
    const listSpecificationUseCase = _tsyringe.container.resolve(_ListSpecificationUseCase.ListSpecificationUseCase);

    const AllList = await listSpecificationUseCase.execute();
    return response.json(AllList);
  }

}

exports.ListSpecificationController = ListSpecificationController;