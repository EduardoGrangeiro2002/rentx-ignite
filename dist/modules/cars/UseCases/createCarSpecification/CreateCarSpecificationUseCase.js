"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationUseCase = void 0;

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _ISpecificatiosRepository = require("@modules/cars/repositories/ISpecificatiosRepository");

var _AppError = require("@shared/error/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateCarSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationsRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _ISpecificatiosRepository.ISpecificatiosRepository === "undefined" ? Object : _ISpecificatiosRepository.ISpecificatiosRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCarSpecificationUseCase {
  constructor(carsRepositories, specificationRepository) {
    this.carsRepositories = carsRepositories;
    this.specificationRepository = specificationRepository;
  }

  async execute({
    car_id,
    specifications_id
  }) {
    const carsExists = await this.carsRepositories.findById(car_id);
    if (!carsExists) throw new _AppError.AppError("Cars does not exists");
    const specification = await this.specificationRepository.findByIds(specifications_id);
    carsExists.specification = specification;
    await this.carsRepositories.create(carsExists);
    return carsExists;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCarSpecificationUseCase = CreateCarSpecificationUseCase;