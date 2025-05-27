import { Request, Response } from "express";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { prisma } from "@/prisma";

export class CollectController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            productId: z.string()
        })

        const { productId } = bodySchema.parse(request.body)

        const product = await prisma.produto.findFirst({ where: { id: productId }})

        if(!product){
            throw new AppError("This product not exists", 401)
        }

        if(!request.user?.id){
            throw new AppError("This enterprise not exists", 401)
        }

        const newCollect = await prisma.coleta.create({
            data:{
                productId: product.id,
                adress: product.userAdress,
                enterpriseId: request.user.id
            }
        })

        response.json({ newCollect })
    }
}