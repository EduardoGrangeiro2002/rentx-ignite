"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailController = void 0;

var _tsyringe = require("tsyringe");

var _sendForgotPasswordMailUseCase = require("./sendForgotPasswordMailUseCase");

class SendForgotPasswordMailController {
  async handle(request, response) {
    const {
      email
    } = request.body;

    const sendForgorPasswordMailUseCase = _tsyringe.container.resolve(_sendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase);

    await sendForgorPasswordMailUseCase.execute(email);
    return response.send();
  }

}

exports.SendForgotPasswordMailController = SendForgotPasswordMailController;