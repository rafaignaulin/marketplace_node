// src/repositories/ProdutoRepository.ts
import { EntityRepository, Repository, getRepository } from "typeorm";
import { Product } from "../entities/Product";
import AppError from "@shared/errors/AppError";

@EntityRepository(Product)
export class ProductRepository /*extends Repository<Product>*/ {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }
  // Aqui você pode adicionar métodos personalizados para consultas específicas, se necessário
  
  async findProductById(id: string): Promise<Product> {
    return await this.repository.findOne(id)
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.repository.find()
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    const produto = this.repository.create(product);
    return this.repository.save(produto);
  }

  async updateProduct(productId: string, product: Partial<Product>): Promise<Product> {

    const produto = await this.repository.findOne(productId);
    if (!produto) return null;
    this.repository.merge(produto, product);
    return this.repository.save(produto);
  
  }

  async deleteProduct(userId: string, productId: string) {
    console.log("Deletar id", userId, productId)
    const userProduct = await this.repository.findOne({where:{ id: productId, id_seller: userId}})
    if (!userProduct) { 
      throw new AppError("This product does not belong to this user")
    }

    await this.repository.delete(productId);
  }

}
