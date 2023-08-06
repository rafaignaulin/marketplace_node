import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrders1691292880759 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "orders",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "totalPrice",
                type: "numeric",
                precision: 10,
                scale: 2,
              },
              {
                name: "status",
                type: "varchar",
              },
              {
                name: "seller_id",
                type: "uuid",
              },
              {
                name: "buyer_id",
                type: "uuid",
              },
              {
                name: "product_id",
                type: "uuid",
              },
            ],
          })
        );
    
        // Add foreign key for seller_id
        await queryRunner.createForeignKey(
          "orders",
          new TableForeignKey({
            columnNames: ["seller_id"],
            referencedTableName: "users", // Replace "users" with the actual table name for User entity
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          })
        );
    
        // Add foreign key for buyer_id
        await queryRunner.createForeignKey(
          "orders",
          new TableForeignKey({
            columnNames: ["buyer_id"],
            referencedTableName: "users", // Replace "users" with the actual table name for User entity
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          })
        );

        await queryRunner.createForeignKey(
            "orders",
            new TableForeignKey({
              columnNames: ["product_id"],
              referencedTableName: "products", // Replace "users" with the actual table name for User entity
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
            })
          );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys first to avoid conflicts
        const table = await queryRunner.getTable("orders");
        const sellerFk = table?.foreignKeys.find((fk) => fk.columnNames.indexOf("seller_id") !== -1);
        const buyerFk = table?.foreignKeys.find((fk) => fk.columnNames.indexOf("buyer_id") !== -1);
        const productFk = table?.foreignKeys.find((fk) => fk.columnNames.indexOf("product_id") !== -1);
    
        if (sellerFk) {
          await queryRunner.dropForeignKey("orders", sellerFk);
        }
    
        if (buyerFk) {
          await queryRunner.dropForeignKey("orders", buyerFk);
        }

        if (productFk) {
            await queryRunner.dropForeignKey("orders", productFk);
        }
    
        // Drop the "orders" table
        await queryRunner.dropTable("orders");
      }
    }