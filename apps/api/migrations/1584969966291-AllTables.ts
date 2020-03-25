import {MigrationInterface, QueryRunner} from "typeorm";

export class AllTables1584969966291 implements MigrationInterface {
    name = 'AllTables1584969966291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ohjaaja" ("id" SERIAL NOT NULL, "nimi" character varying NOT NULL, "puhelin" character varying NOT NULL, "sposti" character varying NOT NULL, CONSTRAINT "PK_22b5894eea8857a0940c0f43330" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "oppilas" ("id" SERIAL NOT NULL, "nimi" character varying NOT NULL, "ryhma" integer NOT NULL, "aloituspvm" TIMESTAMP NOT NULL, "lopetuspvm" TIMESTAMP NOT NULL, CONSTRAINT "PK_9e1fefafd5df9f669e17d430ae0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "ryhma" ("id" SERIAL NOT NULL, "nimi" character varying NOT NULL, CONSTRAINT "PK_0ada2cb5a75796a25c4c3e597d6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "tjk_paikka" ("id" SERIAL NOT NULL, "nimi" character varying NOT NULL, "osoite" json NOT NULL, "kuvaus" text NOT NULL, "puhelin" character varying NOT NULL, "url" character varying NOT NULL, "sposti" character varying NOT NULL, "ohjaajat" integer array NOT NULL, CONSTRAINT "PK_803001979a549780572d067aee7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "vastuuopettaja" ("id" SERIAL NOT NULL, "nimi" character varying NOT NULL, "puhelin" character varying NOT NULL, "sposti" character varying NOT NULL, CONSTRAINT "PK_fea4104a3042c02fddf8dcae7f2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "yhdistely" ("id" SERIAL NOT NULL, "ohjaaja" integer NOT NULL, "oppilas" integer NOT NULL, "tjkpaikka" integer NOT NULL, "vastuuopettaja" integer NOT NULL, CONSTRAINT "PK_252c35e124d9553ba6e289b0134" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "yhdistely"`, undefined);
        await queryRunner.query(`DROP TABLE "vastuuopettaja"`, undefined);
        await queryRunner.query(`DROP TABLE "tjk_paikka"`, undefined);
        await queryRunner.query(`DROP TABLE "ryhma"`, undefined);
        await queryRunner.query(`DROP TABLE "oppilas"`, undefined);
        await queryRunner.query(`DROP TABLE "ohjaaja"`, undefined);
    }

}
