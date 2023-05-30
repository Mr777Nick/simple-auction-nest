import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitProject1685476241158 implements MigrationInterface {
  name = 'InitProject1685476241158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "internalTransactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL DEFAULT 'SYSTEM', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "deletedAt" TIMESTAMP, "deletedBy" character varying, "type" character varying NOT NULL, "amount" double precision NOT NULL, "status" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_c2c5ddfe1e1eae821ba50656b37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL DEFAULT 'SYSTEM', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "deletedAt" TIMESTAMP, "deletedBy" character varying, "status" character varying NOT NULL, "name" character varying NOT NULL, "startPrice" double precision NOT NULL, "endedAt" TIMESTAMP NOT NULL, "currentPrice" double precision, "soldPrice" double precision, "userId" uuid NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "itemBids" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL DEFAULT 'SYSTEM', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "deletedAt" TIMESTAMP, "deletedBy" character varying, "price" double precision NOT NULL, "userId" uuid NOT NULL, "itemId" uuid NOT NULL, CONSTRAINT "PK_5053f5fa6ecd844e98c2d13f592" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL DEFAULT 'SYSTEM', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "deletedAt" TIMESTAMP, "deletedBy" character varying, "name" character varying NOT NULL, "balance" double precision NOT NULL DEFAULT '0', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "internalTransactions" ADD CONSTRAINT "FK_244c084cdc9b36f2ef3153e7ed8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_40e681891fea5a4b3c5c2546d15" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemBids" ADD CONSTRAINT "FK_fb681cc636cfdcac4d2cd6b1260" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemBids" ADD CONSTRAINT "FK_fe3da06e7ebd62dea88b13ce3e4" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "itemBids" DROP CONSTRAINT "FK_fe3da06e7ebd62dea88b13ce3e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemBids" DROP CONSTRAINT "FK_fb681cc636cfdcac4d2cd6b1260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_40e681891fea5a4b3c5c2546d15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internalTransactions" DROP CONSTRAINT "FK_244c084cdc9b36f2ef3153e7ed8"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "itemBids"`);
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "internalTransactions"`);
  }
}
