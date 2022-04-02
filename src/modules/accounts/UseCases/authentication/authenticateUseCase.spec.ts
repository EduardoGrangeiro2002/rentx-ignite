import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoriesInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoiesInMemory";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/UseCases/authentication/authenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/UseCases/CreateUser/CreateUserUseCase";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/error/AppError";

let autheticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: IUsersTokensRepository
let dateProvider: IDateProvider

describe("Autheticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory(),
    dateProvider = new DayjsDateProvider();
    autheticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
  });

  it("should be able to autheticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      name: "User test",
      password: "1234",
    };

    await createUserUseCase.execute(user);

    const result = await autheticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to autheticate an nonexistent user", async () => {
    expect(autheticateUserUseCase.execute({
        email: "false@.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("User or password incorrect!", 401))
  });

  it("should not be able to autheticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      name: "User test",
      password: "1234",
    };

    await createUserUseCase.execute(user),

    await expect(
      autheticateUserUseCase.execute({
        email: user.email,
        password: "4321",
      })

    ).rejects.toEqual(new AppError("User or password incorrect!", 401))
  });
});
