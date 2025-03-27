import { SetMetadata } from '@nestjs/common'
import { DecoratorsName } from './decorators-name'

export const Public = (isPublic: boolean = true) => SetMetadata(DecoratorsName.Public, isPublic)
