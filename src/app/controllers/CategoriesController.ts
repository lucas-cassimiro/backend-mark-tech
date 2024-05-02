import { Request, Response } from "express";
import prisma from "../../../config/clientPrisma";

export class CategoriesController {
    async index(_req: Request, res: Response) {
        try {
            const categories = await prisma.categorie.findMany()
            return res.json(categories)
        } catch (error) {
            return res.status(500).send({ message: 'Falha ao buscar categoria de produtos.' })
        }
    }
}