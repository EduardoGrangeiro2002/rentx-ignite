"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _IUserRepositories = require("@modules/accounts/repositories/IUserRepositories");

var _AppError = require("@shared/error/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepositories")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepositories.IUserRepositories === "undefined" ? Object : _IUserRepositories.IUserRepositories]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(userRepositories) {
    this.userRepositories = userRepositories;
  }

  async execute({
    name,
    password,
    email,
    driver_license
  }) {
    const UserAlreadyExists = await this.userRepositories.findByEmail(email);

    if (UserAlreadyExists) {
      throw new _AppError.AppError("User already exists");
    }

    const passwordHash = await (0, _bcrypt.hash)(password, 8);
    this.userRepositories.create({
      name,
      password: passwordHash,
      email,
      driver_license
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;