import { ResetPasswordController } from "@modules/accounts/UseCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/UseCases/sendForgotPasswordMail/sendForgotPasswordController";
import { SendForgotPasswordMailUseCase } from "@modules/accounts/UseCases/sendForgotPasswordMail/sendForgotPasswordMailUseCase";
import { Router } from "express";



export const passwordRoutes = Router();


const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();


passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);