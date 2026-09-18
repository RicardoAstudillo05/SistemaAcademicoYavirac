import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNumeroSigaToMatricula1789700000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE public.matricula
                ADD COLUMN numero_siga VARCHAR(30) NULL;
        `);

        await queryRunner.query(`
            CREATE INDEX idx_matricula_numero_siga
                ON public.matricula USING btree (numero_siga);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS public.idx_matricula_numero_siga;`);
        await queryRunner.query(`ALTER TABLE public.matricula DROP COLUMN IF EXISTS numero_siga;`);
    }
}
