import { Router } from "express";
import multer from "multer";

import uploadConfig from "@configs/upload";
import { CreateUserController } from "@modules/accounts/UseCases/CreateUser/UserController";
import { ProfileUserController } from "@modules/accounts/UseCases/profileUserUseCase/ProfileUserController";
import { CreateRefreshTokenController } from "@modules/accounts/UseCases/refresh_token/CreateRefreshTokenController";
import { UpdateUserAvatarController } from "@modules/accounts/UseCases/updateUserAvatar/updateUserAvatarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthentication";

const UserRouter = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();

const updateUserAvatarController = new UpdateUserAvatarController();

const createRefreshTokenController = new CreateRefreshTokenController();

const profileController = new ProfileUserController();

UserRouter.post("/", createUserController.handle);

UserRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

UserRouter.post("/refresh-token", createRefreshTokenController.handle);

UserRouter.get("/", ensureAuthenticated, profileController.handle);

export { UserRouter };
