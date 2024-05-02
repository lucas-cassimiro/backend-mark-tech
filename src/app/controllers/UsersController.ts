import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../../../config/clientPrisma";

export class UsersController {
  async create(req: Request, res: Response) {
    try {
      const { email, first_name, last_name, password, cellphone, date_birth } =
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
        password_hash: password,
        cellphone,
        date_birth
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

  async login(req: Request, res: Response) {
    try {
      const { email, password_hash } = req.body

      const findUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!findUser) {
        return res.status(401).send({
          message:
            "Este e-mail não está cadastrado. Clique em Inscrever-se e faça seu cadastro.",
        });
      }

      const verifyPass = await bcrypt.compare(
        password_hash,
        findUser.password_hash
      );

      if (!verifyPass) {
        return res
          .status(401)
          .send({ message: "Usuário ou senha incorretos." });
      }

      const token = jwt.sign({ data: findUser }, process.env.JWT_PASS ?? "", {
        expiresIn: "8h",
      });

      const { password_hash: _, ...userLogin } = findUser;

      return res.status(200).json({
        user: userLogin,
        token: token,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}
