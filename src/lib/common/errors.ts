import { HttpStatus } from '@nestjs/common'

export type ErrorResponse = {
    code: HttpStatus
    message: string
}
