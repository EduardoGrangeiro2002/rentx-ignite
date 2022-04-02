"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCases = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("@shared/error/AppError");

var _ICategoriesRepositoryInterface = require("../../repositories/ICategoriesRepositoryInterface");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateCategoryUseCases = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepositoryInterface.ICategoryRepositoryInterface === "undefined" ? Object : _ICategoriesRepositoryInterface.ICategoryRepositoryInterface]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCases {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    name,
    description
  }) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new _AppError.AppError("Category already exists");
    }

    await this.categoriesRepository.create({
      description,
      name
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCategoryUseCases = CreateCategoryUseCases;