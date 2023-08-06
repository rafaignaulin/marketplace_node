import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { Entity, Column,  JoinColumn, OneToOne, OneToMany, PrimaryColumn } from "typeorm";

import { v4 as uuidV4 } from "uuid";


@Entity("orders")
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  totalPrice: number;

  @Column()
  status: string;

  @Column()
  seller_id: string;

  @Column()
  buyer_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "seller_id" })
  seller: User;

  @OneToOne(() => User)
  @JoinColumn({ name: "buyer_id" })
  buyer: User;
  
  @Column()
  product_id: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
