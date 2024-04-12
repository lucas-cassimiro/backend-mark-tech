import { Request, Response } from "express";

import bcrypt from "bcrypt";

import prisma from "../../../config/clientPrisma";

export class UsersController {
  async create(req: Request, res: Response) {
    try {
      const { email, first_name, last_name, password_hash, cellphone } =
        req.body;

      const userExistentInDatabase = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExistentInDatabase)
        return res
          .status(400)
          .send({ message: "Usuário já cadastrado no Banco de Dados." });

      const newUser = {
        email,
        first_name,
        last_name,
        password_hash,
        cellphone,
      };

      const hash = bcrypt.hashSync(newUser.password_hash, 10);

      newUser.password_hash = hash;

      await prisma.user.create({
        data: newUser,
      });

      return res.status(201).send({ message: "Cadastro efetuado." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Falha ao cadastrar usuário." });
    }
  }
}
