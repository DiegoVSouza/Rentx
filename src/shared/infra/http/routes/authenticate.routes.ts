import { Router } from 'express'
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()


authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refreshtoken", refreshTokenController.handle)

export { authenticateRoutes }