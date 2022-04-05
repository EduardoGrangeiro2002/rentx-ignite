import { NextFunction, Request, Response } from "express";

import { UsersRepositories } from "@modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { AppError } from "@shared/error/AppError";

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UsersRepositories();
  const user = await userRepository.findById(id);

  if (!user.isAdmin) throw new AppError("Usuário não permitido!", 401);

  return next();
}
