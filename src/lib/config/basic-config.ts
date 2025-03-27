import { HttpMethods } from 'lib/common'
import { EnvironmentVariables } from './environment.variables'
import { toBoolean } from './utils'

export const basicConfig = (configEnvs: EnvironmentVariables) => ({
    expressConfig: {
        port: configEnvs.API_PORT,
        host: configEnvs.API_HOST,
        useLogs: toBoolean(configEnvs.USE_LOGS),
        logFormat: '[:status] ":method :url HTTP/:http-version" :request-info - :remote-user :remote-addr [:date[web]] - :response-time ms',
    },
    corsConfig: {
        origin: configEnvs.CORS_ALLOWED_ORIGINS,
        methods: [HttpMethods.GET, HttpMethods.POST, HttpMethods.HEAD, HttpMethods.OPTIONS],
        credentials: true,
    },
    bodyParserConfig: {
        limit: configEnvs.MAX_FILE_SIZE_KB,
    },
    swaggerConfig: {
        useSwagger: toBoolean(configEnvs.USE_SWAGGER),
        route: configEnvs.SWAGGER_ROUTE,
    },
})
