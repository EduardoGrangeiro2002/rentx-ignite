"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _ListCategoriesUseCase = require("./ListCategoriesUseCase");

class ListCategoryController {
  async handle(request, response) {
    const listCategoriesUseCase = _tsyringe.container.resolve(_ListCategoriesUseCase.ListCategoryUseCase);

    const AllListCategories = await listCategoriesUseCase.execute();
    return response.json(AllListCategories);
  }

}

exports.ListCategoryController = ListCategoryController;