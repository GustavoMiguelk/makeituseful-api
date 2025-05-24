import { Request, Response } from "express";

export class EnterpriseController{
    async create(request: Request, response: Response){
        response.json({ message: "OK"})
    }
}