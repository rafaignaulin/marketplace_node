// src/controllers/OrderController.ts
import { Request, Response } from "express";
import { container } from "tsyringe";
import { OrderUseCase } from "./OrderUseCase";

export class OrderController {


  async getAllOrders (req: Request, res: Response) {
      try {
      const orderUseCase = container.resolve(OrderUseCase)
      const orders = await orderUseCase.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  async createOrder (req: Request, res: Response) {

    const orderUseCase = container.resolve(OrderUseCase)

    const { id : productId } = req.params;
    const { id : buyerId } = req.user

    console.log("aqui", productId, buyerId)
    const order = await orderUseCase.createOrder(productId, buyerId);
    res.status(201).json(order);

  };

  async updateOrder (req: Request, res: Response) {
    try {
      const orderUseCase = container.resolve(OrderUseCase)
      
      const orderId = req.params.id;
      const { status } = req.body;
      const updatedOrder = await orderUseCase.updateOrderStatus(orderId, status);
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  async deleteOrder (req: Request, res: Response) {
    try {
      const orderUseCase = container.resolve(OrderUseCase)
      const orderId = req.params.id;
      await orderUseCase.deleteOrder(orderId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
