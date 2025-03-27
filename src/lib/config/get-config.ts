import { plainToInstance } from 'class-transformer'
import { typeORMConfig } from 'database'
import { EnvironmentVariables } from './environment.variables'
import { basicConfig } from './basic-config'
import { healthCheckConfig } from './health-check.config'
import { authConfig } from './auth.config'

export const getConfig = () => {
    const configEnvs = plainToInstance(EnvironmentVariables, process.env, {
        enableImplicitConversion: true,
    })

    return {
        basicConfig: basicConfig(configEnvs),
        healthCheckConfig: healthCheckConfig(configEnvs),
        typeORMConfig: typeORMConfig(configEnvs),
        authConfig: authConfig(configEnvs),
    }
}
