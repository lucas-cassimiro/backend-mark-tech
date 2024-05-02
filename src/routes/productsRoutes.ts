import { Router } from "express";

import { ProductsController } from "../app/controllers/ProductsController";

import upload from "../middlewares/multer";

const productsRoutes = Router()

productsRoutes.post('/', upload.single('file'), new ProductsController().create)
productsRoutes.get('/:param', new ProductsController().show)

export default productsRoutes