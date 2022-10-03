import { Router } from "express";
import { ensureAutheticate } from "../middlewares/ensureAuthenticated";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalByUser/ListRentalsByUserController";

const rentalRoutes = Router()
const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post('/', ensureAutheticate, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAutheticate, devolutionRentalController.handle)
rentalRoutes.post('/user', ensureAutheticate, listRentalsByUserController.handle)

export { rentalRoutes }