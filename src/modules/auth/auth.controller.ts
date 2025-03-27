import { Body, Controller, Post } from '@nestjs/common'
import { Public } from 'lib/decorators'
import { UserType } from 'lib/enums'
import { AuthService } from './auth.service'
import { AUTH } from './constants'
import { RegisterDto } from './dto'
import { RegisterResponse } from './responses'

@Controller(AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(dto, UserType.User)
    }
}
