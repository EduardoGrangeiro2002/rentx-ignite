"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAdmin;

var _UsersRepositories = require("@modules/accounts/infra/typeorm/repositories/UsersRepositories");

var _AppError = require("@shared/error/AppError");

async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const userRepository = new _UsersRepositories.UsersRepositories();
  const user = await userRepository.findById(id);
  if (!user.isAdmin) throw new _AppError.AppError("Usuário não permitido!", 401);
  return next();
}