import { IUserRepositories } from "@modules/accounts/repositories/IUserRepositories";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/error/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";



type IRequest = { 
  password: string;
  token: string;
}


@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private userTokensRepository: IUsersTokensRepository,
    @inject("UsersRepositories")
    private userRepository: IUserRepositories,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ password, token }: IRequest): Promise<void> {
    const userTokens = await this.userTokensRepository.findByRefreshToken(token);

    const { user_id } = userTokens;
    
    if(!userTokens) throw new AppError("Token invalid!");


    if(this.dateProvider.compareIfBefore(userTokens.expires_date, this.dateProvider.dateNow())){
      throw new AppError("Token is expired!");
    }

    const user = await this.userRepository.findById(user_id)

    const passwordHash = await hash(password, 8)

    user.password = passwordHash;


    await this.userRepository.create(user);
  
  }
}