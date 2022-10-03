import { Router } from "express";
import { ensureAutheticate } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/createSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";


const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.post("/", ensureAutheticate, ensureAdmin, createSpecificationController.handle)

export { specificationRoutes }