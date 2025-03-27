import { IsStrongPasswordOptions } from 'class-validator'

export const passwordRules: IsStrongPasswordOptions = {
    minLength: 8,
    minLowercase: 0,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
}
