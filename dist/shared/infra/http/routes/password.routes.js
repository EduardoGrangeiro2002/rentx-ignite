"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _ResetPasswordController = require("@modules/accounts/UseCases/resetPassword/ResetPasswordController");

var _sendForgotPasswordController = require("@modules/accounts/UseCases/sendForgotPasswordMail/sendForgotPasswordController");

var _express = require("express");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMailController = new _sendForgotPasswordController.SendForgotPasswordMailController();
const resetPasswordController = new _ResetPasswordController.ResetPasswordController();
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);