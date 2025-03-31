import { IsJWT } from 'class-validator'

export class ConfirmRegisterDto {
    @IsJWT()
    readonly token: string
}
