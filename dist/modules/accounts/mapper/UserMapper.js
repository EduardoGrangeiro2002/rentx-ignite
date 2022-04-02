"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMapper = void 0;

var _classTransformer = require("class-transformer");

class UserMapper {
  static toDTO({
    avatar,
    created_at,
    driver_license,
    email,
    name,
    id,
    avatarUrl
  }) {
    const user = (0, _classTransformer.instanceToInstance)({
      avatar,
      created_at,
      driver_license,
      email,
      name,
      id,
      avatarUrl
    });
    return user;
  }

}

exports.UserMapper = UserMapper;