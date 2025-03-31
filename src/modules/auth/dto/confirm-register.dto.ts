import { ApiProperty } from '@nestjs/swagger'
import { IsJWT } from 'class-validator'

export class ConfirmRegisterDto {
    @ApiProperty({
        description: 'JWT token sent via email for confirming user registration',
    })
    @IsJWT()
    readonly token: string
}
