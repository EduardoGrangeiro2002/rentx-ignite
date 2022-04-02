"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUseCase = void 0;

var _IUserRepositories = require("@modules/accounts/repositories/IUserRepositories");

var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("@shared/error/AppError");

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepositories")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IUserRepositories.IUserRepositories === "undefined" ? Object : _IUserRepositories.IUserRepositories, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUseCase {
  constructor(userTokensRepository, userRepository, dateProvider) {
    this.userTokensRepository = userTokensRepository;
    this.userRepository = userRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    password,
    token
  }) {
    const userTokens = await this.userTokensRepository.findByRefreshToken(token);
    const {
      user_id
    } = userTokens;
    if (!userTokens) throw new _AppError.AppError("Token invalid!");

    if (this.dateProvider.compareIfBefore(userTokens.expires_date, this.dateProvider.dateNow())) {
      throw new _AppError.AppError("Token is expired!");
    }

    const user = await this.userRepository.findById(user_id);
    const passwordHash = await (0, _bcrypt.hash)(password, 8);
    user.password = passwordHash;
    await this.userRepository.create(user);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUseCase = ResetPasswordUseCase;