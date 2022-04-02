import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/UseCases/authentication/authenticateUserController";
import { CreateRefreshTokenController } from "@modules/accounts/UseCases/refresh_token/CreateRefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
