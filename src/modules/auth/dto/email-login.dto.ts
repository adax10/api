import { IsEmail, IsStrongPassword } from 'class-validator'
import { passwordRules } from 'lib/utils'

export class EmailLoginDto {
    @IsEmail()
    readonly email: string

    @IsStrongPassword(passwordRules)
    readonly password: string
}
