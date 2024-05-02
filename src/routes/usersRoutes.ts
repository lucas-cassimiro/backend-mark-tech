import { Router } from "express";

import { UsersController } from "../app/controllers/UsersController";
import { authMiddleware } from "../middlewares/auth";

const usersRoutes = Router();

usersRoutes.post("/", new UsersController().create);
usersRoutes.get("/profile", authMiddleware, new UsersController().getProfile);
usersRoutes.post("/login", new UsersController().login);

export default usersRoutes;
