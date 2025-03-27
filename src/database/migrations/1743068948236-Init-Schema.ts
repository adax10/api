import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitSchema1743068948236 implements MigrationInterface {
    name = 'InitSchema1743068948236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`user\` (\`exampleUUID\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`exampleUUID\`)) ENGINE=InnoDB`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``)
    }
}
