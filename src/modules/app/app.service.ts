import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common'
import { getConfig } from 'lib/config'
import { LOGGER_CONTEXT, SHUTDOWN_MESSAGE, BOOTSTRAP_MESSAGE } from './constants'

@Injectable()
export class AppService implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly logger = new Logger(LOGGER_CONTEXT)

    onApplicationBootstrap() {
        const { expressConfig, swaggerConfig } = getConfig().basicConfig

        this.logger.log(BOOTSTRAP_MESSAGE(expressConfig, swaggerConfig))
    }

    onApplicationShutdown() {
        this.logger.log(SHUTDOWN_MESSAGE)

        process.exit(0)
    }
}
