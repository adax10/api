import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { getConfig, envValidation } from 'lib/config'
import { HealthCheckModule } from 'modules/health-check'
import { AuthModule } from 'modules/auth'
import { AppService } from './app.service'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: envValidation,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => getConfig().typeORMConfig,
        }),
        HealthCheckModule,
        AuthModule,
    ],
    providers: [AppService],
})
export class AppModule {}
