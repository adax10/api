import { HttpStatus } from '@nestjs/common'

export enum InternalErrorCode {
    MissingDeviceId = 101,
}

export type ErrorResponse = {
    code: HttpStatus
    message: string
    internalCode?: InternalErrorCode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: Record<string, any>
}
