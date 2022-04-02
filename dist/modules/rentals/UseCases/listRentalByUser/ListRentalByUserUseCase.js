"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalByUserUseCase = void 0;

var _IRepositoryRentals = require("@modules/rentals/repositories/IRepositoryRentals");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let ListRentalByUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRepositoryRentals.IRepositoryRentals === "undefined" ? Object : _IRepositoryRentals.IRepositoryRentals]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListRentalByUserUseCase {
  constructor(rentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute(id) {
    const rentals = await this.rentalsRepository.findByUserId(id);
    return rentals;
  }

}) || _class) || _class) || _class) || _class);
exports.ListRentalByUserUseCase = ListRentalByUserUseCase;