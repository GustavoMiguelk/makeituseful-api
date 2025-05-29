import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";
import { verifyUserAuth } from "@/middlewares/verify-user-auth";

export const productsRoutes = Router()

const productsController = new ProductsController()

productsRoutes.post("/", productsController.create)
productsRoutes.get("/", productsController.index)