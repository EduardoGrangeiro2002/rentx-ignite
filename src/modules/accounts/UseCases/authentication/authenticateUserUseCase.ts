import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUserRepositories } from "@modules/accounts/repositories/IUserRepositories";
import { AppError } from "@shared/error/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@configs/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IResponse {
  user: {
    name: string;
    email: string;
  };

  token: string;

  refresh_token: string;
}

interface IRequest {
  email: string;
  password: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepositories")
    private UserRepository: IUserRepositories,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.UserRepository.findByEmail(email);

    const { expires_in_refresh_token, 
            expires_in_token, 
            secret_refresh_token, 
            secret_token } = auth

    if (!user) {
      throw new AppError("User or password incorrect!", 401);
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User or password incorrect!", 401);
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const expires_date =  this.dateProvider.addDays(auth.expires_refresh_token)


    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id: user.id
    })

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
