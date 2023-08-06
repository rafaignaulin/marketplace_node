// src/usecases/produtoService.ts
import { injectable, inject } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductRepository";

@injectable()
export class ProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepository
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = this.productRepository.getAllProducts();
    console.log(products)
    return products
  }

  async createProduct(produtoData: Partial<Product>): Promise<Product> {
    console.log(produtoData, this.productRepository)
    return this.productRepository.createProduct(produtoData)
     
  }

  async updateProduct(produtoId: string, produtoData: Partial<Product>): Promise<Product | null> {
    return this.productRepository.updateProduct(produtoId, produtoData)
  }

  async deleteProduct(userId: string, productId: string): Promise<void> {
    
    await this.productRepository.deleteProduct(userId, productId);
  }
}
