"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationRepositoryInMemory = void 0;

var _Specification = require("@modules/cars/infra/typeorm/Entities/Specification");

class SpecificationRepositoryInMemory {
  constructor() {
    this.specification = [];
  }

  async findByIds(ids) {
    const allSpecifications = this.specification.filter(specifications => ids.includes(specifications.id));
    return allSpecifications;
  }

  async create({
    name,
    description
  }) {
    const car = new _Specification.Specification();
    Object.assign(car, {
      name,
      description
    });
    const cars = this.specification.push(car);
    return car;
  }

  async findByName(name) {
    return this.specification.find(specifications => specifications.name === name);
  }

  async list() {
    return this.specification;
  }

}

exports.SpecificationRepositoryInMemory = SpecificationRepositoryInMemory;