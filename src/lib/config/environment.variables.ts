import { IsBooleanString, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateIf } from 'class-validator'
import { Type } from 'class-transformer'
import { toBoolean } from './utils'

export class EnvironmentVariables {
    @IsOptional()
    readonly NODE_ENV: 'development' | 'production' = 'development'

    @IsOptional()
    @IsNumber()
    readonly API_PORT: number = 3000

    @IsOptional()
    @IsString()
    readonly API_HOST: string = '0.0.0.0'

    @IsOptional()
    @IsString()
    readonly CORS_ALLOWED_ORIGINS: string = '*'

    @IsOptional()
    @IsString()
    readonly SERVICE_VERSION: string = 'unknown'

    @IsOptional()
    @IsInt()
    readonly MAX_FILE_SIZE_KB: number = 20 * 1024 * 1024 // default 20 MB

    @Type(() => String)
    @IsBooleanString()
    readonly USE_LOGS: string = 'true'

    @Type(() => String)
    @IsBooleanString()
    readonly USE_SWAGGER: string = 'true'

    @ValidateIf(value => toBoolean(value.USE_SWAGGER))
    @IsString()
    readonly SWAGGER_ROUTE: string = '/swagger'

    @IsString()
    readonly TYPEORM_CONNECTION: 'mariadb'

    @IsString()
    readonly TYPEORM_HOST: string

    @IsString()
    readonly TYPEORM_USERNAME: string

    @IsString()
    readonly TYPEORM_PASSWORD: string

    @IsString()
    readonly TYPEORM_DATABASE: string

    @IsInt()
    @IsPositive()
    readonly TYPEORM_PORT: number

    @Type(() => String)
    @IsBooleanString()
    readonly TYPEORM_SYNCHRONIZE: string = 'false'

    @Type(() => String)
    @IsBooleanString()
    readonly TYPEORM_LOGGING: string = 'false'

    @Type(() => String)
    @IsBooleanString()
    readonly TYPEORM_DEBUG: string = 'false'

    @IsString()
    readonly JWT_TOKEN_PRIVATE_KEY: string

    @IsString()
    readonly JWT_TOKEN_PUBLIC_KEY: string

    @IsString()
    readonly AUTH_COOKIE_NAME: string = 'auth-token'

    @IsString()
    readonly AUTH_QUERY_PARAM_NAME: string = 'auth-token'
}
