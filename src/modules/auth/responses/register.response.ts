export class RegisterResponse {
    readonly email: string
    readonly userUUID: string
    readonly token: string // note: token should be send via email
}
