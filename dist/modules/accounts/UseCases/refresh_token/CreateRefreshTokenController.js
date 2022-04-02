"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRefreshTokenController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRefreshTokenUseCase = require("./CreateRefreshTokenUseCase");

class CreateRefreshTokenController {
  async handle(request, response) {
    const token = request.body.token || request.headers["x-access-token"] || request.query.token;

    const createRefreshTokenUseCase = _tsyringe.container.resolve(_CreateRefreshTokenUseCase.CreateRefreshTokenUseCase);

    const refresh_token = await createRefreshTokenUseCase.execute(token);
    return response.status(201).json(refresh_token);
  }

}

exports.CreateRefreshTokenController = CreateRefreshTokenController;