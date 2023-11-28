import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1694597993690 implements MigrationInterface {
    name = 'Migrations1694597993690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image_generate" ("id_image_generate" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying, "file_path" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57d10906c7d2c9268c9808d7e46" PRIMARY KEY ("id_image_generate"))`);
        await queryRunner.query(`CREATE TABLE "attachment_display" ("id_attachment_display" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying, "file_path" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb5a0aa214211d0ff1ef80a48cf" PRIMARY KEY ("id_attachment_display"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id_user" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying(255) NOT NULL, "password" text NOT NULL, "need_change_password" boolean NOT NULL DEFAULT false, "level" character varying NOT NULL DEFAULT 'Admin', "token" character varying, "user_status" character varying, "file_path" character varying, "file_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "counter_id" uuid, CONSTRAINT "REL_5c2c82cfbec78b3da60c160f9a" UNIQUE ("counter_id"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "counters" ("id_counter" uuid NOT NULL DEFAULT uuid_generate_v4(), "counter_num" integer NOT NULL, "counter_name" character varying NOT NULL, "counter_status" character varying NOT NULL DEFAULT 'INACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "queue_type" character varying, "user_id" uuid, CONSTRAINT "UQ_490fc2d0af063bfaf08499d4187" UNIQUE ("user_id"), CONSTRAINT "REL_490fc2d0af063bfaf08499d418" UNIQUE ("user_id"), CONSTRAINT "PK_0904541e9028d1ce4c9dad8c0a2" PRIMARY KEY ("id_counter"))`);
        await queryRunner.query(`CREATE TABLE "antrians" ("id_queue" uuid NOT NULL DEFAULT uuid_generate_v4(), "queue_num" integer, "queue_status" character varying NOT NULL, "queue_type" character varying NOT NULL, "queue_code" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_counter" uuid, CONSTRAINT "PK_9336c85ea52477e543bbe527526" PRIMARY KEY ("id_queue"))`);
        await queryRunner.query(`CREATE TABLE "page_display" ("id_page_display" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "text_desc" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'INACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d0454f3eb7827a3686692e9cbaa" PRIMARY KEY ("id_page_display"))`);
        await queryRunner.query(`CREATE TABLE "page_generate" ("id_page" uuid NOT NULL DEFAULT uuid_generate_v4(), "text_header" character varying NOT NULL, "text_title" character varying NOT NULL, "text_desc" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'INACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_738a2616877dc8791302045bfda" PRIMARY KEY ("id_page"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_user_counter" FOREIGN KEY ("counter_id") REFERENCES "counters"("id_counter") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "counters" ADD CONSTRAINT "fk_counter_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "antrians" ADD CONSTRAINT "FK_052b4fefe62e123957cde6f4549" FOREIGN KEY ("id_counter") REFERENCES "counters"("id_counter") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "antrians" DROP CONSTRAINT "FK_052b4fefe62e123957cde6f4549"`);
        await queryRunner.query(`ALTER TABLE "counters" DROP CONSTRAINT "fk_counter_user_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_user_counter"`);
        await queryRunner.query(`DROP TABLE "page_generate"`);
        await queryRunner.query(`DROP TABLE "page_display"`);
        await queryRunner.query(`DROP TABLE "antrians"`);
        await queryRunner.query(`DROP TABLE "counters"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "attachment_display"`);
        await queryRunner.query(`DROP TABLE "image_generate"`);
    }

}
