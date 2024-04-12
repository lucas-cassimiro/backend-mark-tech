import { Router } from "express";

import { UsersController } from "../app/controllers/UsersController";

const usersRoutes = Router();

usersRoutes.post("/", new UsersController().create);

export default usersRoutes;