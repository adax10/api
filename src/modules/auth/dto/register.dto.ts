import { IsEmail, IsString, IsStrongPassword } from 'class-validator'
import { passwordRules } from 'lib/utils'

export class RegisterDto {
    @IsString()
    readonly fullName: string

    @IsEmail()
    readonly email: string

    @IsStrongPassword(passwordRules)
    readonly password: string
}
