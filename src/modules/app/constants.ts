import { ExpressConfig, SwaggerConfig } from './types'

export const LOGGER_CONTEXT = 'NestApplication'

export const BOOTSTRAP_MESSAGE = (expressConfig: ExpressConfig, swaggerConfig: SwaggerConfig) => {
    const { host, port } = expressConfig
    const { useSwagger, route } = swaggerConfig

    return `Nest application is listening on - ${host}:${port} ${
        useSwagger ? `and swagger is available on - ${host}:${port}${route}` : 'and swagger is not available'
    }`
}

export const SHUTDOWN_MESSAGE = 'Nest application successfully stopped'
