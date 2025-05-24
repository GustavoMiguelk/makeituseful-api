import { Router } from "express";
import { EnterpriseController } from "@/controllers/enterprise-controller";

export const enterpriseRoutes = Router()

const enterpriseController = new EnterpriseController()

enterpriseRoutes.post("/", enterpriseController.create)