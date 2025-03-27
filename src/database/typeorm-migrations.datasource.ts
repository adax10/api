import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import * as Entities from './entities'

config()

const configService = new ConfigService()

// this datasource is needed to generate migrations - it's not used in application itself
export default new DataSource({
    type: 'mysql',
    host: configService.get('TYPEORM_HOST'),
    port: configService.get('TYPEORM_PORT'),
    username: configService.get('TYPEORM_USERNAME'),
    password: configService.get('TYPEORM_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE'),
    entities: Entities,
})
