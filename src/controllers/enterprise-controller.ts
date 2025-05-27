import { Request, Response } from "express";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { prisma } from "@/prisma";
import { hash} from "bcrypt"
import { isCnpj } from "validator-brazil";

export class EnterpriseController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            cnpj: z.string()
        })

        const { name, email, password, cnpj} = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.empresas.findFirst( { where: { email } })

        const userWithSameCNPJ = await prisma.empresas.findFirst({ where: { cnpj }})

        if(userWithSameEmail){
            throw new AppError("User with same email already exists", 401)
        }

        if(userWithSameCNPJ){
            throw new AppError("User with same CNPJ already exists", 401)
        }

        if(isCnpj(cnpj) === false){
            throw new AppError("Insert a valid CNPJ", 401)
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.empresas.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cnpj
            }
        })

        const { password: _, ...userWithouPassword } = user

        response.json({ userWithouPassword })
    }
}