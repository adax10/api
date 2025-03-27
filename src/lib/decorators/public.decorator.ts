import { SetMetadata } from '@nestjs/common'
import { DecoratorName } from 'lib/enums'

export const Public = (isPublic: boolean = true) => SetMetadata(DecoratorName.Public, isPublic)
