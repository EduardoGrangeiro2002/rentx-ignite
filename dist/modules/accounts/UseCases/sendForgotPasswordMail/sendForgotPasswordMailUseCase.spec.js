"use strict";

var _UserRepositoriesInMemory = require("@modules/accounts/repositories/in-memory/UserRepositoriesInMemory");

var _UsersTokensRepositoiesInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoiesInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/implementations/MailProviderInMemory");

var _AppError = require("@shared/error/AppError");

var _sendForgotPasswordMailUseCase = require("./sendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UserRepositoriesInMemory.UserRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoiesInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _sendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, mailProvider, dateProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "avzonbop@ospo.pr",
      name: "Blanche Curry",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("avzonbop@ospo.pr");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("ka@uj.gr")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "abome@regrog.ee",
      name: "Leon Perkins",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("abome@regrog.ee");
    expect(generateTokenMail).toBeCalled();
  });
});