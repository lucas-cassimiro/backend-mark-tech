import { Router } from "express";

import { PartnersController } from "../app/controllers/PartnersController";
import { authMiddleware } from "../middlewares/auth-partner";

const partnersRoutes = Router();

partnersRoutes.get('/', new PartnersController().index);
partnersRoutes.post("/", new PartnersController().create);
partnersRoutes.get("/profile", authMiddleware, new PartnersController().getProfile);
partnersRoutes.post("/login", new PartnersController().login);

export default partnersRoutes;