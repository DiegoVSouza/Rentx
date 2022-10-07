import { Router } from "express";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendFogotPasswordMail/SendFogotPasswordMailController";

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)

export { passwordRoutes }