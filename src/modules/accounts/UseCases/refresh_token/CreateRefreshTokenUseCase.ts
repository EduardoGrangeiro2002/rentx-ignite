import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@configs/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/error/AppError";

type IPayload = {
  sub: string;
  email: string;
};

type IResponse = {
  newToken: string;
  refresh_token: string;
};

@injectable()
export class CreateRefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private tokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<IResponse> {
    const decodeToken = verify(token, auth.secret_refresh_token) as IPayload;

    const { sub, email } = decodeToken;

    const user_id = sub;

    const userToken = await this.tokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) throw new AppError("Refresh-Token does not exists!");

    await this.tokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token);

    await this.tokensRepository.create({
      refresh_token,
      expires_date,
      user_id,
    });

    return {
      refresh_token,
      newToken,
    };
  }
}
