"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRefreshTokenUseCase = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("@configs/auth"));

var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("@shared/error/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateRefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateRefreshTokenUseCase {
  constructor(tokensRepository, dateProvider) {
    this.tokensRepository = tokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute(token) {
    const decodeToken = (0, _jsonwebtoken.verify)(token, _auth.default.secret_refresh_token);
    const {
      sub,
      email
    } = decodeToken;
    const user_id = sub;
    const userToken = await this.tokensRepository.findByUserIdAndRefreshToken(user_id, token);
    if (!userToken) throw new _AppError.AppError("Refresh-Token does not exists!");
    await this.tokensRepository.deleteById(userToken.id);
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: user_id,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    const newToken = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user_id,
      expiresIn: _auth.default.expires_in_token
    });
    const expires_date = this.dateProvider.addDays(_auth.default.expires_refresh_token);
    await this.tokensRepository.create({
      refresh_token,
      expires_date,
      user_id
    });
    return {
      refresh_token,
      newToken
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateRefreshTokenUseCase = CreateRefreshTokenUseCase;