"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;

var _tsyringe = require("tsyringe");

var _authenticateUserUseCase = require("@modules/accounts/UseCases/authentication/authenticateUserUseCase");

class AuthenticateUserController {
  async handle(request, response) {
    const {
      password,
      email
    } = request.body;

    const authenticateUserUseCase = _tsyringe.container.resolve(_authenticateUserUseCase.AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({
      email,
      password
    });
    return response.json(token);
  }

}

exports.AuthenticateUserController = AuthenticateUserController;