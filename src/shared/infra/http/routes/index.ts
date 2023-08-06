import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";

import { passwordRoutes } from "./password.routes";
import { usersRoutes } from "./users.routes";
import { productRoutes } from "./products.routes";
import { orderRoutes } from "./order.routes";

export const router = Router();

router.use(authenticateRoutes);
router.use("/password", passwordRoutes);
router.use("/users", usersRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
