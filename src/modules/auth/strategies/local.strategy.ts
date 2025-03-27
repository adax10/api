import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { AuthStrategy } from '../types'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AuthStrategy.Local) {
    constructor(private readonly authService: AuthService) {
        super({
            passReqToCallback: false,
            usernameField: 'email',
        })
    }

    validate(email: string, password: string) {
        return this.authService.loginWithMail({
            email,
            password,
        })
    }
}
