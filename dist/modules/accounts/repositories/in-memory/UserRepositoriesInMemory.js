"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepositoryInMemory = void 0;

var _User = require("@modules/accounts/infra/typeorm/Entities/User");

class UserRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create({
    name,
    email,
    driver_license,
    password
  }) {
    const user = new _User.User();
    Object.assign(user, {
      name,
      email,
      driver_license,
      password
    });
    this.users.push(user);
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async list() {
    return this.users;
  }

  async findById(id) {
    const user = this.users.find(user => user.id === id);
    return user;
  }

}

exports.UserRepositoryInMemory = UserRepositoryInMemory;