import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePhone1781079969919 implements MigrationInterface {
    name = 'RemovePhone1781079969919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
