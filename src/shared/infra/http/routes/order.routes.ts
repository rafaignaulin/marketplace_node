// src/routes/orderRoutes.ts
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { OrderController } from "@modules/orders/useCases/OrderController";

export const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.get("/", ensureAuthenticated, orderController.getAllOrders);
orderRoutes.post("/:id", ensureAuthenticated, orderController.createOrder);
orderRoutes.put("/:id", ensureAuthenticated, orderController.updateOrder);
orderRoutes.delete("/:id", ensureAuthenticated, orderController.deleteOrder);
