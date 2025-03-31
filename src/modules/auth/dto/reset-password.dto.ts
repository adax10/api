import { ApiProperty } from '@nestjs/swagger'
import { IsJWT, IsStrongPassword } from 'class-validator'
import { passwordRules } from 'lib/utils'

export class ResetPasswordDto {
    @ApiProperty({
        description: 'JWT token sent via email for forgetting password.',
    })
    @IsJWT()
    readonly token: string

    @IsStrongPassword(passwordRules)
    readonly password: string
}
