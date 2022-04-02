"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("@shared/error/AppError");

var _tsyringe = require("tsyringe");

var _IRepositoryRentals = require("../../repositories/IRepositoryRentals");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRepositoryRentals.IRepositoryRentals === "undefined" ? Object : _IRepositoryRentals.IRepositoryRentals, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalsRepository, dayjsDateProvider, carsRepository) {
    this.rentalsRepository = rentalsRepository;
    this.dayjsDateProvider = dayjsDateProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    car_id,
    expected_return_date,
    user_id
  }) {
    const minimumHour = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if (carUnavailable) throw new _AppError.AppError("car is unavailable!");
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (rentalOpenToUser) throw new _AppError.AppError("There's a rental in progress for user!");
    const dateNow = this.dayjsDateProvider.dateNow();
    const compare = this.dayjsDateProvider.compareInHours(dateNow, expected_return_date);
    if (compare < minimumHour) throw new _AppError.AppError("Invalid return time, less than 24 hours!");
    const rentals = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id
    });
    await this.carsRepository.updateCarAvailable(car_id, false);
    return rentals;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;