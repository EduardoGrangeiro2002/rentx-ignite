"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _IUserRepositories = require("@modules/accounts/repositories/IUserRepositories");

var _AppError = require("@shared/error/AppError");

var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");

var _auth = _interopRequireDefault(require("@configs/auth"));

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepositories")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepositories.IUserRepositories === "undefined" ? Object : _IUserRepositories.IUserRepositories, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(UserRepository, usersTokensRepository, dateProvider) {
    this.UserRepository = UserRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.UserRepository.findByEmail(email);
    const {
      expires_in_refresh_token,
      expires_in_token,
      secret_refresh_token,
      secret_token
    } = _auth.default;

    if (!user) {
      throw new _AppError.AppError("User or password incorrect!", 401);
    }

    const passwordMatch = await (0, _bcrypt.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError("User or password incorrect!", 401);
    }

    const token = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });
    const expires_date = this.dateProvider.addDays(_auth.default.expires_refresh_token);
    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id: user.id
    });
    const tokenReturn = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email
      }
    };
    return tokenReturn;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;