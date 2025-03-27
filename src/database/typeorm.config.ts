import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { EnvironmentVariables, toBoolean } from 'lib/config'
import { TimeIntervalMs } from 'lib/enums'
import * as Migrations from './migrations'
import * as Entities from './entities'

export const typeORMConfig = (configEnvs: EnvironmentVariables): TypeOrmModuleOptions => ({
    type: configEnvs.TYPEORM_CONNECTION,
    host: configEnvs.TYPEORM_HOST,
    port: configEnvs.TYPEORM_PORT,
    username: configEnvs.TYPEORM_USERNAME,
    password: configEnvs.TYPEORM_PASSWORD,
    database: configEnvs.TYPEORM_DATABASE,
    entities: Object.values(Entities),
    migrations: Object.values(Migrations),
    migrationsRun: true,
    autoLoadEntities: true,
    logging: toBoolean(configEnvs.TYPEORM_LOGGING),
    debug: toBoolean(configEnvs.TYPEORM_DEBUG),
    synchronize: toBoolean(configEnvs.TYPEORM_SYNCHRONIZE),
    maxQueryExecutionTime: TimeIntervalMs.Minute,
    legacySpatialSupport: false,
    bigNumberStrings: false,
    charset: 'utf8mb4_general_ci',
    extra: {
        connectionLimit: 2,
    },
})
