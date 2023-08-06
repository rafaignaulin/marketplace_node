// src/entities/Produto.ts
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("products")
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  id_seller: string;

  @Column("text", { array: true, default: "{}" }) 
  images: string[];

  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: "id_seller" })
  user_seller: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
