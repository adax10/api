import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUser1743081367293 implements MigrationInterface {
    name = 'UpdateUser1743081367293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_66272908024ef48f54bf0c1c6fe\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userTypeUUID\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userTypeUUID\` varchar(255) NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_66272908024ef48f54bf0c1c6fe\` FOREIGN KEY (\`userTypeUUID\`) REFERENCES \`userType\`(\`userTypeUUID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_66272908024ef48f54bf0c1c6fe\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userTypeUUID\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userTypeUUID\` varchar(36) NULL DEFAULT 'NULL'`)
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_66272908024ef48f54bf0c1c6fe\` FOREIGN KEY (\`userTypeUUID\`) REFERENCES \`userType\`(\`userTypeUUID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }
}
