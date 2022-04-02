"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../Entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async updateCarAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

  async findById(id) {
    return await this.repository.findOne(id);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specification,
    id
  }) {
    const car = this.repository.create({
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      category_id,
      specification,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicense_plate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async FinAllCarsAvaliable(name, category_id, brand) {
    const carsQuery = this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (name) {
      carsQuery.andWhere("c.name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id
      });
    }

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", {
        brand
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

}

exports.CarsRepository = CarsRepository;