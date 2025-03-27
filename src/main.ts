import { ShutdownSignal } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { Request } from 'express'
import helmet from 'helmet'
import { json } from 'body-parser'
import morgan from 'morgan'
import 'lib/logger'
import { splitCorsOrigin, getConfig } from 'lib/config'
import { HttpMethodGuard } from 'lib/guards'
import { ContentTypeInterceptor } from 'lib/interceptors'
import { AppModule } from 'modules/app'
import { HEALTH_CHECK } from 'modules/health-check'

const bootstrap = async () => {
    const { expressConfig, bodyParserConfig, corsConfig, swaggerConfig } = getConfig().basicConfig
    const { port, host, useLogs, logFormat } = expressConfig
    const { origin, methods, credentials } = corsConfig

    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.use(
        helmet({
            noSniff: true,
            hidePoweredBy: true,
        }),
    )
    app.enableCors({
        origin: splitCorsOrigin(origin),
        methods,
        credentials,
    })
    app.useGlobalGuards(new HttpMethodGuard())
    app.useGlobalInterceptors(new ContentTypeInterceptor())
    app.use(json(bodyParserConfig))
    app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM])

    if (useLogs) {
        app.use(
            morgan(logFormat, {
                skip: (req: Request) => req.path === `/${HEALTH_CHECK}`,
            }),
        )
    }

    if (swaggerConfig.useSwagger) {
        const config = new DocumentBuilder().build()
        const document = SwaggerModule.createDocument(app, config)

        SwaggerModule.setup(swaggerConfig.route, app, document)
    }

    await app.listen(port, host)
}

bootstrap()
