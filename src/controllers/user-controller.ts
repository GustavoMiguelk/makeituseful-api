import { Request, Response } from "express";
import { prisma } from "@/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";

export class UserController{
    async create(request: Request, response: Response):Promise<any>{
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            adress: z.string()
        })

        const { name, email, password, adress } = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst( { where: { email } })

        const hashedPassword = await hash(password, 8)

        if(userWithSameEmail){
            throw new AppError("User with same email already exists", 400)
        }

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                adress
            }
        })

        const { password: _, ...userWithoutPassword } = user

        return response.status(201).json({ userWithoutPassword })
    }
}