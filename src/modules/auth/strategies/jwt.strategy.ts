import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { getConfig } from 'lib/config'
import { R } from 'lib/utils'
import { TokenPayload, AuthStrategy, TokenTypes } from '../types'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
    constructor(private readonly authService: AuthService) {
        const extractTokenFromCookie = (req: Request) => req.cookies[getConfig().authConfig.cookieName]

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                extractTokenFromCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                ExtractJwt.fromUrlQueryParameter(getConfig().authConfig.queryParamName),
            ]),
            ignoreExpiration: false,
            passReqToCallback: false,
            secretOrKey: getConfig().authConfig.jwtPublicKey,
        })
    }

    validate(token: TokenPayload) {
        if (token.tokenUse !== TokenTypes.AccessToken) {
            return false
        }

        if (R.isNil(token.sub)) {
            return false
        }

        return this.authService.getLoggedUser(token.sub, token.payload.userType)
    }
}
