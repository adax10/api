export type UserToSave = {
    fullName: string
    email: string
    password: string
    userTypeUUID: string
}

export type UserTokenPayload = {
    userUUID: string
}
