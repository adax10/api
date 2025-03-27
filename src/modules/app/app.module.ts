import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n'
import path from 'node:path'
import { getConfig, envValidation } from 'lib/config'
import { ExampleModule } from 'modules/example'
import { HealthCheckModule } from 'modules/health-check'
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
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, './../../i18n/'),
                watch: true,
            },
            resolvers: [AcceptLanguageResolver],
        }),
        HealthCheckModule,
        ExampleModule,
    ],
    providers: [AppService],
})
export class AppModule {}
