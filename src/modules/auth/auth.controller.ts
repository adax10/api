import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AUTH } from './constants'

@Controller(AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {}
}
