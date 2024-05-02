import { Router } from "express";

import { CategoriesController } from "../app/controllers/CategoriesController";

const categoriesRoutes = Router()

categoriesRoutes.get('/', new CategoriesController().index)

export default categoriesRoutes