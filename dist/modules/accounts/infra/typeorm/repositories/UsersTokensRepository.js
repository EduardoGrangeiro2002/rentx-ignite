"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UsersTokens = require("../Entities/UsersTokens");

class UsersTokensRepository {
  constructor() {
    this.usersTokensRepository = void 0;
    this.usersTokensRepository = (0, _typeorm.getRepository)(_UsersTokens.UsersTokens);
  }

  async findByRefreshToken(token) {
    return await this.usersTokensRepository.findOne({
      refresh_token: token
    });
  }

  async deleteById(id) {
    await this.usersTokensRepository.delete(id);
  }

  async findByUserIdAndRefreshToken(user_id, token) {
    const userTokens = await this.usersTokensRepository.findOne({
      user_id,
      refresh_token: token
    });
    return userTokens;
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const newToken = this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.usersTokensRepository.save(newToken);
    return newToken;
  }

}

exports.UsersTokensRepository = UsersTokensRepository;