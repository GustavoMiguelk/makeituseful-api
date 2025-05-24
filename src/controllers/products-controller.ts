import { Request, Response } from "express";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { prisma } from "@/prisma";

export class ProductsController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string(),
            weight: z.number(),
        })

        const { name, weight } = bodySchema.parse(request.body)

        const userId = request.user?.id

        const user = await prisma.user.findFirst({
            where: { id: userId }
        })

        if(!user){
            throw new AppError("User not Founded", 404)
        }

        const newProduct = await prisma.produto.create({
            data: {
                name: name,
                weight: weight,
                userAdress: user?.adress,
                idUsuario: user?.id
            },
        })


        response.json({ newProduct })
    }

    async index(request: Request, response: Response){
        const products = await prisma.produto.findMany({
            where: {status: "OPEN"}
        })

        response.json(products)
    }
}