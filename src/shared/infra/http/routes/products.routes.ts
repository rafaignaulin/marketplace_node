// src/routes/produtoRoutes.ts
import { Router } from "express";
import ProductController from "@modules/products/useCases/productController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import multer from "multer";
import upload from "@config/upload";

export const productRoutes = Router();

const productController = new ProductController()

const uploadImage = multer(upload.upload("./tmp/products"));

productRoutes.get("/", ensureAuthenticated, productController.getAllProducts);
productRoutes.post("/", ensureAuthenticated, uploadImage.array("images", 10), productController.createProduct);
productRoutes.put("/:id", ensureAuthenticated, uploadImage.array("images", 10), productController.updateProduct);
productRoutes.delete("/:id", ensureAuthenticated, productController.deleteProduct);

