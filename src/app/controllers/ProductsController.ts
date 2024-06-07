import { Request, Response } from "express";

import prisma from "../../../config/clientPrisma";

export class ProductsController {
    async create(req: Request, res: Response) {
        try {
            const { name, price, description, ean, highlight, categorie_id, discount } = req.body

            const productExistent = await prisma.product.findUnique({
                where: {
                    ean
                }
            })

            if (productExistent) return res.status(400).send({ message: 'Produto já cadastrado.' })

            const image = req.file?.filename;

            await prisma.product.create({
                data: {
                    name,
                    price: Number(price),
                    description,
                    image: image,
                    ean,
                    highlight: Boolean(highlight),
                    categorie_id: Number(categorie_id),
                    discount: Number(discount)
                }
            })

            return res.send({ message: 'Produto cadastrado com sucesso. ' })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Internal server error' })
        }
    }

    async show(req: Request, res: Response) {
        const param = req.params.param.toLowerCase().replace('acougue', 'Açougue')

        try {
            const products = await prisma.product.findMany({
                include: {
                    categories: true
                },
                where: {
                    categories: {
                        name: {
                            equals: param,
                            mode: 'insensitive'
                        }
                    }
                }
            });

            if (!products.length) {
                return res.status(400).send({ message: 'Categoria de produtos não encontrada.' });
            }

            return res.status(200).send(products);
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    }

    async index(req: Request, res: Response) {
        try {
            const products = await prisma.product.findMany({
                where: {
                    highlight: true
                }
            })

            return res.send(products)
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' })
        }
    }
}