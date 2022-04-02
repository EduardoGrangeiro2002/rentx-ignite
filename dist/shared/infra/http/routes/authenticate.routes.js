"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateRoutes = void 0;

var _express = require("express");

var _authenticateUserController = require("@modules/accounts/UseCases/authentication/authenticateUserController");

const authenticateRoutes = (0, _express.Router)();
exports.authenticateRoutes = authenticateRoutes;
const authenticateUserController = new _authenticateUserController.AuthenticateUserController();
authenticateRoutes.post("/sessions", authenticateUserController.handle);