// src/repositories/OrderRepository.ts
import { EntityRepository, Repository, getRepository } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { Order } from "../entities/Order";
import AppError from "@shared/errors/AppError";

@EntityRepository(Order)
export class OrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.repository.find();
  }

  async findIfOrderExists(seller_id: string, buyer_id: string, product_id: string): Promise<Order> {
    return await this.repository.findOne({ where: { product_id, seller_id, buyer_id }})
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const order = this.repository.create(orderData);
    return this.repository.save(order);
  }

  async updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order | null> {
    const order = await this.repository.findOne(orderId);
    if (!order) throw new AppError("This order does not exists");
    this.repository.merge(order, orderData);
    return this.repository.save(order);
  }

  async deleteOrder(orderId: string) {
    await this.repository.delete(orderId);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
    const order = await this.repository.findOne(orderId);
    if (!order) return null;
    order.status = status;
    return this.repository.save(order);
  }
}
