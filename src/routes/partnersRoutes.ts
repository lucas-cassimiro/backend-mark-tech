import { Router } from "express";

import { PartnersController } from "../app/controllers/PartnersController";
import { authMiddleware } from "../middlewares/auth";

const partnersRoutes = Router();

partnersRoutes.post("/", new PartnersController().create);
partnersRoutes.get("/profile", authMiddleware, new PartnersController().getProfile);
partnersRoutes.post("/login", new PartnersController().login);

export default partnersRoutes;