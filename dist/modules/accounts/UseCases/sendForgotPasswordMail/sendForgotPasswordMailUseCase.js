"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailUseCase = void 0;

var _path = require("path");

var _tsyringe = require("tsyringe");

var _uuid = require("uuid");

var _IUserRepositories = require("@modules/accounts/repositories/IUserRepositories");

var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _IMailProvider = require("@shared/container/providers/MailProvider/IMailProvider");

var _AppError = require("@shared/error/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

let SendForgotPasswordMailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepositories")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("MailProvider")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUserRepositories.IUserRepositories === "undefined" ? Object : _IUserRepositories.IUserRepositories, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IMailProvider.IMailProvider === "undefined" ? Object : _IMailProvider.IMailProvider, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class SendForgotPasswordMailUseCase {
  constructor(userRepository, userTokensRepository, mailProvider, dateProvider) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.mailProvider = mailProvider;
    this.dateProvider = dateProvider;
  }

  async execute(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new _AppError.AppError("User does not exists!");
    const templatePath = (0, _path.resolve)(__dirname, "..", "..", "views", "forgotPassword.hbs");
    const {
      id: user_id,
      name
    } = user;
    const tokenRecoveryPassword = (0, _uuid.v4)();
    const expires_date = await this.dateProvider.addHours(3);
    await this.userTokensRepository.create({
      user_id,
      expires_date,
      refresh_token: tokenRecoveryPassword
    });
    const variables = {
      name,
      link: `${process.env.FORGOT_MAIL_URL}${tokenRecoveryPassword}`
    };
    await this.mailProvider.sendMail(email, "Recuperação de Senha", variables, templatePath);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;