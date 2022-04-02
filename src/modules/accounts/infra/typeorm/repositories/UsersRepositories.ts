import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserRepositories } from "../../../repositories/IUserRepositories";
import { User } from "../Entities/User";

class UsersRepositories implements IUserRepositories {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const User = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(User);
  }

  async findByEmail(email: string): Promise<User> {
    const User = await this.repository.findOne({ email });
    return User;
  }

  async list(): Promise<User[]> {
    const Users = await this.repository.find();

    return Users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }
}

export { UsersRepositories };
