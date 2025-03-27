import { MigrationInterface, QueryRunner } from 'typeorm'
import { randomUUID } from 'node:crypto'
import { UserType } from 'lib/enums'

export class AddUserTypes1743074392903 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO \`userType\` (userTypeUUID, type) VALUES ('${randomUUID()}', '${UserType.Admin}'), ('${randomUUID()}', '${UserType.User}');`,
        )
    }

    // eslint-disable-next-line no-empty-function
    public async down(): Promise<void> {}
}
