"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _Category = require("@modules/cars/infra/typeorm/Entities/Category");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async findByName(name) {
    const Category = this.categories.find(category => category.name === name);
    return Category;
  }

  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description
    });
    this.categories.push(category);
  }

  async list() {
    return this.categories;
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;