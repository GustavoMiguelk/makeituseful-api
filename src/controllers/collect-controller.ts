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

        const enterprise = await prisma.empresas.findFirst({ where:{ id: request.user?.id }})

        if(!product){
            throw new AppError("This product not exists", 401)
        }

        if(product.status === "SELECTED"){
            throw new AppError("This product is already selected", 401)
        }

        if(!enterprise){
            throw new AppError("This enterprise not exists", 401)
        }

        const newCollect = await prisma.coleta.create({
            data:{
                productId: product.id,
                userId: product.idUsuario,
                adress: product.userAdress,
                enterpriseId: enterprise.id 
            }
        })

        await prisma.produto.update({
            where: { id: product.id },
            data:{
                status: "SELECTED"
            }
        })

        response.json({ newCollect })
    }

    async update(request: Request, response: Response){
        const bodySchema = z.object({
            id: z.string(),
            status: z.enum(["PENDING", "COLLECTED"])
        })

        const { id, status } = bodySchema.parse(request.body)

        const hasCollect = await prisma.coleta.findFirst({ where: { id } })

        if(!hasCollect){
            throw new AppError("This collect not exists", 401)
        }

        if(hasCollect.status === "COLLECTED"){
            throw new AppError("This collect is already collected", 401)
        }

        const updateCollectStatus = await prisma.coleta.update({
             where: { id: hasCollect.id },
             data: { status: status }
            })

        response.json({ updateCollectStatus })
    }
}