import { JwtPayload } from 'jsonwebtoken'
import { UserType } from 'lib/enums'

export enum AuthStrategy {
    JWT = 'jwt',
    Email = 'email',
}

export interface TokenPayload extends JwtPayload {
    tokenUse: string
    payload: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
        userType: UserType
    }
}

export enum TokenTypes {
    AccessToken = 'access-token',
    RefreshToken = 'refresh-token',
}
