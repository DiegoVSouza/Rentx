

import { Router } from "express";

import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/listCategoriesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAutheticate } from "../middlewares/ensureAuthenticated";


const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

const categoriesRoutes = Router();


categoriesRoutes.post("/", ensureAutheticate, ensureAdmin, createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post("/import", ensureAutheticate, ensureAdmin, importCategoryController.handle)


export { categoriesRoutes };
