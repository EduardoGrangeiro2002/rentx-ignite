"use strict";

var _UserRepositoriesInMemory = require("@modules/accounts/repositories/in-memory/UserRepositoriesInMemory");

var _UsersTokensRepositoiesInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoiesInMemory");

var _authenticateUserUseCase = require("@modules/accounts/UseCases/authentication/authenticateUserUseCase");

var _CreateUserUseCase = require("@modules/accounts/UseCases/CreateUser/CreateUserUseCase");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/error/AppError");

let autheticateUserUseCase;
let createUserUseCase;
let userRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
describe("Autheticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new _UserRepositoriesInMemory.UserRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(userRepositoryInMemory);
    usersTokensRepositoryInMemory = new _UsersTokensRepositoiesInMemory.UsersTokensRepositoryInMemory(), dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    autheticateUserUseCase = new _authenticateUserUseCase.AuthenticateUserUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
  });
  it("should be able to autheticate an user", async () => {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      name: "User test",
      password: "1234"
    };
    await createUserUseCase.execute(user);
    const result = await autheticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to autheticate an nonexistent user", async () => {
    expect(autheticateUserUseCase.execute({
      email: "false@.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("User or password incorrect!", 401));
  });
  it("should not be able to autheticate with incorrect password", async () => {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      name: "User test",
      password: "1234"
    };
    await createUserUseCase.execute(user), await expect(autheticateUserUseCase.execute({
      email: user.email,
      password: "4321"
    })).rejects.toEqual(new _AppError.AppError("User or password incorrect!", 401));
  });
});