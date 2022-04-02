"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationUseCase = void 0;

var _tsyringe = require("tsyringe");

var _SpecificationRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationRepository");

var _ISpecificatiosRepository = require("@modules/cars/repositories/ISpecificatiosRepository");

var _AppError = require("@shared/error/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificatiosRepository.ISpecificatiosRepository === "undefined" ? Object : _ISpecificatiosRepository.ISpecificatiosRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSpecificationUseCase {
  constructor(specificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  async execute({
    name,
    description
  }) {
    const repo = new _SpecificationRepository.SpecificationRepository();
    const specificationAlreadyExist = await repo.findByName(name);

    if (specificationAlreadyExist) {
      throw new _AppError.AppError("Specification already exist");
    }

    this.specificationRepository.create({
      description,
      name
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateSpecificationUseCase = CreateSpecificationUseCase;