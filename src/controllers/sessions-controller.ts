import { Request, Response } from "express";
import { compare } from "bcrypt";

import { prisma } from "@/prisma";

import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

export class SessionsController {
    async create(request:Request, response: Response,):Promise<any>{
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string()
        })

        const { email, password } = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: { email }
        })

        if(!user){
            throw new AppError("Invalid Email or Password!", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Invalid Email or Password!", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({role: user.role}, secret, {
            subject: String(user.id),
            expiresIn,
        })

        const { password: hashedPassword, ...userWithouPassword} = user

        response.json({
            token,
            userWithouPassword,
        })
    }
}