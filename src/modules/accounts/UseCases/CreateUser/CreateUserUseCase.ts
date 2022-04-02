import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepositories } from "@modules/accounts/repositories/IUserRepositories";
import { AppError } from "@shared/error/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepositories")
    private userRepositories: IUserRepositories
  ) {}
  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const UserAlreadyExists = await this.userRepositories.findByEmail(email);

    if (UserAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    this.userRepositories.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
