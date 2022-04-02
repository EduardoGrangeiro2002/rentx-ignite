"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("@modules/cars/infra/typeorm/Entities/Specification");

class SpecificationRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specification.Specification);
  }

  async findByIds(ids) {
    return await this.repository.findByIds(ids);
  }

  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      description,
      name
    });
    return await this.repository.save(specification);
  }

  async findByName(name) {
    const specification = await this.repository.findOne({
      name
    });
    return specification;
  }

  async list() {
    const Specifications = await this.repository.find();
    return Specifications;
  }

}

exports.SpecificationRepository = SpecificationRepository;