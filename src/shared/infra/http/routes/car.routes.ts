import { Router } from 'express'
import multer from 'multer'
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationsController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvalibleCars/ListAvailableCarsController'
import { UploadCarImagesController } from '../../../../modules/cars/useCases/uploadCarimage/UploadCarImagesController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAutheticate } from '../middlewares/ensureAuthenticated'

const carRoutes = Router()
import uploadConfig from "../../../../config/upload";


const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationsController = new CreateCarSpecificationsController()
const uploadCarImagesController = new UploadCarImagesController()

const uploadImage = multer(uploadConfig.upload('./tmp/cars'))

carRoutes.post('/', ensureAutheticate, ensureAdmin, createCarController.handle)
carRoutes.get('/available', listAvailableCarsController.handle)
carRoutes.post("/specifications/:id", ensureAutheticate, ensureAdmin, createCarSpecificationsController.handle)
carRoutes.post("/images/:id", ensureAutheticate, ensureAdmin, uploadImage.array("images"), uploadCarImagesController.handle)

export { carRoutes }  