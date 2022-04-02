"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("@modules/accounts/UseCases/CreateUser/CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const {
      name,
      password,
      email,
      driver_license
    } = request.body;

    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license
    });
    return response.status(201).send();
  }

}

exports.CreateUserController = CreateUserController;