import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUniqueInUser1743088464647 implements MigrationInterface {
    name = 'UpdateUniqueInUser1743088464647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``)
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_dbf85368ea633b23b6cb5527fa\` ON \`user\` (\`email\`, \`userTypeUUID\`)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_dbf85368ea633b23b6cb5527fa\` ON \`user\``)
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\` (\`email\`)`)
    }
}
