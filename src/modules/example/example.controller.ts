import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { I18n, I18nContext } from 'nestjs-i18n'
import { EXAMPLE } from './constants'

@ApiTags(EXAMPLE)
@Controller(EXAMPLE)
export class ExampleController {
    @Get()
    getHello(@I18n() i18n: I18nContext) {
        return i18n.t('example.text')
    }
}
