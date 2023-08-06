// src/controllers/produtoController.ts
import { Request, Response } from "express";

import { container } from "tsyringe";
import { ProductUseCase } from "./productUseCase";


export default class  ProductController {
  
  async getAllProducts(req: Request, res: Response) {
    const productUseCase = container.resolve(ProductUseCase);
    const produtos = await productUseCase.getAllProducts();
    return res.json(produtos);
  }

  async createProduct(req: Request, res: Response) {
    const productUseCase = container.resolve(ProductUseCase);
    const { id } = req.user;
    const { name, description, price } = req.body;
    let fileNames = []
    if (req.files){
      fileNames = req.files.map((file) => file.filename);
    }

    const produto = await productUseCase.createProduct({
      name,
      description,
      price,
      id_seller: id,
      images: fileNames
    });
    return res.status(201).json(produto);
  }

  async updateProduct(req: Request, res: Response) {
    const productUseCase = container.resolve(ProductUseCase);

    const { id } = req.params;
    const produto = await productUseCase.updateProduct(id, req.body);
    return res.json(produto);
  }

  async deleteProduct(req: Request, res: Response) {
    const productUseCase = container.resolve(ProductUseCase);
    const { id: userId } = req.user;
    const { id: productId } = req.params;
    await productUseCase.deleteProduct(userId, productId);
    return res.status(204).end();
  }

};
