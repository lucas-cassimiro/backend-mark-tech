import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../../../config/clientPrisma";

export class PartnersController {
    async create(req: Request, res: Response) {
        try {
            const { corporate_reason, cnpj, email, password, cellphone } =
                req.body;

            const partnerExistentInDatabase = await prisma.partner.findUnique({
                where: {
                    email,
                },
            });

            if (partnerExistentInDatabase)
                return res
                    .status(400)
                    .send({ message: "Parceiro já cadastrado no Banco de Dados." });

            const newPartner = {
                email,
                corporate_reason,
                cnpj,
                password_hash: password,
                cellphone,
            };

            const hash = bcrypt.hashSync(newPartner.password_hash, 10);

            newPartner.password_hash = hash;

            await prisma.partner.create({
                data: newPartner,
            });

            return res.status(201).send({ message: "Cadastro efetuado." });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Falha ao cadastrar parceiro." });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password_hash } = req.body

            const findPartner = await prisma.partner.findUnique({
                where: {
                    email,
                },
            });

            if (!findPartner) {
                return res.status(401).send({
                    message:
                        "Este e-mail não está cadastrado. Clique em Inscrever-se e faça seu cadastro.",
                });
            }

            const verifyPass = await bcrypt.compare(
                password_hash,
                findPartner.password_hash
            );

            if (!verifyPass) {
                return res
                    .status(401)
                    .send({ message: "Usuário ou senha incorretos." });
            }

            const token = jwt.sign({ data: findPartner }, process.env.JWT_PASS ?? "", {
                expiresIn: "8h",
            });

            const { password_hash: _, ...userLogin } = findPartner;

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
