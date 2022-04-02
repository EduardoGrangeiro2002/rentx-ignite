import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUserRepositories } from "@modules/accounts/repositories/IUserRepositories";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/error/AppError";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepositories")
    private userRepository: IUserRepositories,
    @inject("UsersTokensRepository")
    private userTokensRepository: IUsersTokensRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("User does not exists!");

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "forgotPassword.hbs"
    );

    const { id: user_id, name } = user;

    const tokenRecoveryPassword = uuidV4();

    const expires_date = await this.dateProvider.addHours(3);

    await this.userTokensRepository.create({
      user_id,
      expires_date,
      refresh_token: tokenRecoveryPassword,
    });

    const variables = {
      name,
      link: `${process.env.FORGOT_MAIL_URL}${tokenRecoveryPassword}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      templatePath
    );
  }
}
