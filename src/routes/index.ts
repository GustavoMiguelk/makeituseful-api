import { Router } from "express";
import { userRoutes } from "./user-routes";
import { sessionsRoutes } from "./sessions-routes";
import { productsRoutes } from "./products-routes";
import { ensureAuth } from "@/middlewares/ensure-authenticated";
import { enterpriseRoutes } from "./enterprise-routes";
import { collectRoutes } from "./collect-routes";
import { verifyUserAuth } from "@/middlewares/verify-user-auth";

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/login", sessionsRoutes)
routes.use("/products", productsRoutes)
routes.use("/enterprises", enterpriseRoutes)
routes.use("/collects", collectRoutes)

