"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("@modules/cars/infra/typeorm/Entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async updateCarAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findByLicense_plate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async FinAllCarsAvaliable(name, category_id, brand) {
    const avaliableCars = this.cars.filter(avaliableCars => avaliableCars.available === true);
    const queryCars = avaliableCars.filter(car => name && car.name === name || brand && car.brand === brand || category_id && car.category_id === category_id);
    return queryCars.length ? queryCars : avaliableCars;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;