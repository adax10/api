import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { APP_GUARD } from '@nestjs/core'
import { UserEntity, UserRefreshTokenEntity, UserTypeEntity } from 'database/entities'
import { getConfig } from 'lib/config'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { GlobalAuthGuard } from './guards'
import { JwtStrategy, EmailStrategy } from './strategies'
import { AuthStrategy } from './types'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserTypeEntity, UserRefreshTokenEntity]),
        PassportModule.register({
            defaultStrategy: AuthStrategy.JWT,
        }),
        JwtModule.registerAsync({
            useFactory: () => ({
                privateKey: getConfig().authConfig.jwtPrivateKey,
                publicKey: getConfig().authConfig.jwtPublicKey,
                signOptions: {
                    algorithm: 'RS256',
                    noTimestamp: true,
                },
                verifyOptions: {
                    algorithms: ['RS256'],
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: GlobalAuthGuard,
        },
        AuthService,
        JwtStrategy,
        EmailStrategy,
    ],
})
export class AuthModule {}
