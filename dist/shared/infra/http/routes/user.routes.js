"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@configs/upload"));

var _UserController = require("@modules/accounts/UseCases/CreateUser/UserController");

var _ProfileUserController = require("@modules/accounts/UseCases/profileUserUseCase/ProfileUserController");

var _CreateRefreshTokenController = require("@modules/accounts/UseCases/refresh_token/CreateRefreshTokenController");

var _updateUserAvatarController = require("@modules/accounts/UseCases/updateUserAvatar/updateUserAvatarController");

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserRouter = (0, _express.Router)();
exports.UserRouter = UserRouter;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _UserController.CreateUserController();
const updateUserAvatarController = new _updateUserAvatarController.UpdateUserAvatarController();
const createRefreshTokenController = new _CreateRefreshTokenController.CreateRefreshTokenController();
const profileController = new _ProfileUserController.ProfileUserController();
UserRouter.post("/", createUserController.handle);
UserRouter.patch("/avatar", _ensureAuthentication.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
UserRouter.post("/refresh-token", createRefreshTokenController.handle);
UserRouter.get("/", _ensureAuthentication.ensureAuthenticated, profileController.handle);