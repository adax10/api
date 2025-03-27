import crypto from 'node:crypto'
import { getConfig } from 'lib/config'

export const hashPassword = (password: string) => {
    const secretOfSecret = getConfig().authConfig.jwtPrivateKey

    return crypto.createHmac('sha256', secretOfSecret).update(`${password}${secretOfSecret}`).digest('hex')
}
