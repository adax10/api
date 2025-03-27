import { createParamDecorator, ExecutionContext, ForbiddenException, HttpStatus } from '@nestjs/common'
import { Request } from 'express'
import { HeadersKey } from 'lib/enums'
import { R } from 'lib/utils'
import { en_US } from 'lib/locale'
import { ErrorResponse, InternalErrorCode } from '../common'

const T = en_US

export const DeviceIdDecorator = createParamDecorator((_, ctx: ExecutionContext) => {
    const deviceId = ctx.switchToHttp().getRequest<Request>().header(HeadersKey.DeviceId)

    if (R.isNil(deviceId)) {
        const error: ErrorResponse = {
            code: HttpStatus.FORBIDDEN,
            message: T.unexpectedError,
            internalCode: InternalErrorCode.MissingDeviceId,
        }

        throw new ForbiddenException(error)
    }

    return deviceId
})
