import { Body, Controller, Post, UseGuards, Res, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { DeviceIdDecorator, Public, UserDecorator } from 'lib/decorators'
import { UserType } from 'lib/enums'
import { User } from 'lib/types'
import { getConfig } from 'lib/config'
import { AuthService } from './auth.service'
import { AUTH } from './constants'
import { ConfirmRegisterDto, EmailLoginDto, RegisterDto } from './dto'
import { ConfirmRegisterResponse, LoginResponse, RegisterResponse } from './responses'
import { AuthStrategy } from './types'

@Controller(AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(dto, UserType.User)
    }

    @Public()
    @Post('confirm-register')
    confirmRegister(@Body() dto: ConfirmRegisterDto): Promise<ConfirmRegisterResponse> {
        return this.authService.confirmRegister(dto)
    }

    @Public()
    @Post('login')
    @UseGuards(AuthGuard(AuthStrategy.Email))
    async loginWithEmail(
        @Body() dto: EmailLoginDto,
        @UserDecorator() user: User,
        @DeviceIdDecorator() deviceId: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<LoginResponse> {
        const { accessToken, refreshToken } = await this.authService.getTokens(user, deviceId)
        res.cookie(getConfig().authConfig.cookieName, accessToken, { secure: true })

        return {
            accessToken,
            refreshToken,
        }
    }

    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    logout(@UserDecorator() user: User, @DeviceIdDecorator() deviceId: string, @Res({ passthrough: true }) res: Response) {
        res.cookie(getConfig().authConfig.cookieName, '', { secure: true })

        return this.authService.removeTokens(user.userUUID, deviceId)
    }
}
