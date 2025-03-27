import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUser1743074253893 implements MigrationInterface {
    name = 'UpdateUser1743074253893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`userRefreshToken\` (\`userRefreshTokenUUID\` varchar(36) NOT NULL, \`userUUID\` varchar(255) NOT NULL, \`deviceId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_3d00b082f4e51c8a5df9e98596\` (\`userUUID\`, \`deviceId\`), PRIMARY KEY (\`userRefreshTokenUUID\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`userType\` (\`userTypeUUID\` varchar(36) NOT NULL, \`type\` enum ('Admin', 'User') NOT NULL DEFAULT 'User', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userTypeUUID\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`exampleUUID\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userUUID\` varchar(36) NOT NULL PRIMARY KEY`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fullName\` varchar(255) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isActive\` tinyint NOT NULL DEFAULT 0`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userTypeUUID\` varchar(36) NULL`)
        await queryRunner.query(`CREATE INDEX \`IDX_638bac731294171648258260ff\` ON \`user\` (\`password\`)`)
        await queryRunner.query(`CREATE INDEX \`IDX_fde2ce12ab12b02ae583dd76c7\` ON \`user\` (\`isActive\`)`)
        await queryRunner.query(`CREATE INDEX \`IDX_c95e384ff549a266b7dcba999d\` ON \`user\` (\`isDeleted\`)`)
        await queryRunner.query(
            `ALTER TABLE \`userRefreshToken\` ADD CONSTRAINT \`FK_5c9ffd658871e3b02c6b5a17dd8\` FOREIGN KEY (\`userUUID\`) REFERENCES \`user\`(\`userUUID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_66272908024ef48f54bf0c1c6fe\` FOREIGN KEY (\`userTypeUUID\`) REFERENCES \`userType\`(\`userTypeUUID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_66272908024ef48f54bf0c1c6fe\``)
        await queryRunner.query(`ALTER TABLE \`userRefreshToken\` DROP FOREIGN KEY \`FK_5c9ffd658871e3b02c6b5a17dd8\``)
        await queryRunner.query(`DROP INDEX \`IDX_c95e384ff549a266b7dcba999d\` ON \`user\``)
        await queryRunner.query(`DROP INDEX \`IDX_fde2ce12ab12b02ae583dd76c7\` ON \`user\``)
        await queryRunner.query(`DROP INDEX \`IDX_638bac731294171648258260ff\` ON \`user\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userTypeUUID\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isDeleted\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isActive\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fullName\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userUUID\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`exampleUUID\` varchar(36) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`exampleUUID\`)`)
        await queryRunner.query(`DROP TABLE \`userType\``)
        await queryRunner.query(`DROP INDEX \`IDX_3d00b082f4e51c8a5df9e98596\` ON \`userRefreshToken\``)
        await queryRunner.query(`DROP TABLE \`userRefreshToken\``)
    }
}
