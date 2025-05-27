import { Router } from "express";
import { CollectController } from "@/controllers/collect-controller";

export const collectRoutes = Router()

const collectController = new CollectController()

collectRoutes.post("/", collectController.create)