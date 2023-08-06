import { container } from "tsyringe";

import "@shared/container/providers";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { OrderRepository } from "@modules/orders/infra/typeorm/repositories/OrderRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);


container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);


container.registerSingleton("ProductRepository", ProductRepository );
container.registerSingleton("OrderRepository", OrderRepository );