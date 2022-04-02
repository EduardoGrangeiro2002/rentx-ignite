"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UsersTokens = require("@modules/accounts/infra/typeorm/Entities/UsersTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.userTokensRepository = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userTokens = new _UsersTokens.UsersTokens();
    Object.assign(userTokens, {
      expires_date,
      refresh_token,
      user_id
    });
    this.userTokensRepository.push(userTokens);
    return userTokens;
  }

  async findByUserIdAndRefreshToken(user_id, token) {
    const userTokens = await this.userTokensRepository.find(ut => {
      ut.user_id === user_id && ut.refresh_token === token;
    });
    return userTokens;
  }

  async deleteById(id) {
    const userTokens = this.userTokensRepository.find(ut => ut.id === id);
    this.userTokensRepository.splice(this.userTokensRepository.indexOf(userTokens));
  }

  async findByRefreshToken(token) {
    const userTokens = this.userTokensRepository.find(ut => ut.refresh_token === token);
    return userTokens;
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;