"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositories = void 0;

var _typeorm = require("typeorm");

var _User = require("../Entities/User");

class UsersRepositories {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id
  }) {
    const User = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id
    });
    await this.repository.save(User);
  }

  async findByEmail(email) {
    const User = await this.repository.findOne({
      email
    });
    return User;
  }

  async list() {
    const Users = await this.repository.find();
    return Users;
  }

  async findById(id) {
    const user = await this.repository.findOne({
      id
    });
    return user;
  }

}

exports.UsersRepositories = UsersRepositories;