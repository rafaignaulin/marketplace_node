import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1691282692634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "products",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                },
                {
                  name: "name",
                  type: "varchar",
                  length: "255",
                },
                {
                  name: "description",
                  type: "text",
                },
                {
                  name: "price",
                  type: "decimal",
                  precision: 10,
                  scale: 2,
                },
                {
                    name: "images",
                    type: "text",
                    isArray: true,
                },
                {
                  name: "id_seller",
                  type: "uuid",
                },
              ],
              foreignKeys: [
                {
                  columnNames: ["id_seller"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "users",
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE"
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
