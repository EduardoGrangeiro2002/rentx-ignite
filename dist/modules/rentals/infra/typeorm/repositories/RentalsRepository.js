"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rentals = require("../Entities/Rentals");

class RentalsRepository {
  constructor() {
    this.repositoryRentals = void 0;
    this.repositoryRentals = (0, _typeorm.getRepository)(_Rentals.Rental);
  }

  async findByUserId(user_id) {
    return await this.repositoryRentals.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
  }

  async findOpenRentalByCar(car_id) {
    const openByCar = await this.repositoryRentals.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id) {
    const openByUser = await this.repositoryRentals.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return openByUser;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total
  }) {
    const rental = this.repositoryRentals.create({
      car_id,
      expected_return_date,
      user_id,
      end_date,
      id,
      total
    });
    await this.repositoryRentals.save(rental);
    return rental;
  }

  async findById(id) {
    return await this.repositoryRentals.findOne(id);
  }

}

exports.RentalsRepository = RentalsRepository;