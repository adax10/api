import { ApiProperty } from '@nestjs/swagger'
import { IsJWT } from 'class-validator'

export class RefreshTokenDto {
    @ApiProperty({
        description: 'The refresh token received from successful login.',
    })
    @IsJWT()
    readonly token: string
}
