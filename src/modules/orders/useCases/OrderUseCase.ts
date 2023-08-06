// src/usecases/OrderUseCase.ts
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { Request } from "express";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { OrderRepository } from "../infra/typeorm/repositories/OrderRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductRepository";
import { Order } from "../infra/typeorm/entities/Order";


@injectable()
export class OrderUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: OrderRepository,

    @inject("ProductRepository")
    private productRepository: ProductRepository
  ) {}

  async getAllOrders() {
    return this.orderRepository.getAllOrders();
  }

  async createOrder(productId: string, buyerId: string) {


    // Primeiro: Buscar todas as informaçoes do produto, inclusive o ID do vendedor
    const product = await this.productRepository.findProductById(productId)

    if(!product) throw new AppError("Product does not exists");

    const verifyIfOrderAlreadyExists = await this.orderRepository.findIfOrderExists(product.id_seller, product.id, buyerId)

    if (!verifyIfOrderAlreadyExists) throw new AppError("Order already Exists!")

    const orderData :Partial<Order> = {
        totalPrice: product.price,
        status: '01 - Criada',
        seller_id: product.id_seller,
        buyer_id: buyerId,
        product_id: product.id
    }
    
    const order = await this.orderRepository.createOrder(orderData);

    return order;
  }

  async updateOrderStatus(orderId: string, status: string) {
    const order = await this.orderRepository.updateOrderStatus(orderId, status);
    if (!order) {
      throw new AppError("Order not found");
    }
    return order;
  }

  async deleteOrder(orderId: string) {
    await this.orderRepository.deleteOrder(orderId);
  }
}
