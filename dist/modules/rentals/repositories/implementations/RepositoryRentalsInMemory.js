"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryRentalsInMemory = void 0;

var _Rentals = require("@modules/rentals/infra/typeorm/Entities/Rentals");

class RepositoryRentalsInMemory {
  constructor() {
    this.rentals = [];
  }

  async findById(id) {
    const rental = this.rentals.find(rental => rental.id === id);
    return rental;
  }

  async findByUserId(user_id) {
    const rentals = this.rentals.filter(rental => rental.user_id === user_id);
    return rentals;
  }

  async create({
    car_id,
    expected_return_date,
    user_id
  }) {
    const rental = new _Rentals.Rental();
    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

}

exports.RepositoryRentalsInMemory = RepositoryRentalsInMemory;