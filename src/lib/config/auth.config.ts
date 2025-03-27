import { EnvironmentVariables } from './environment.variables'

export const authConfig = (configEnvs: EnvironmentVariables) => ({
    cookieName: configEnvs.AUTH_COOKIE_NAME,
    queryParamName: configEnvs.AUTH_QUERY_PARAM_NAME,
    jwtPrivateKey: configEnvs.JWT_TOKEN_PRIVATE_KEY,
    jwtPublicKey: configEnvs.JWT_TOKEN_PUBLIC_KEY,
})
