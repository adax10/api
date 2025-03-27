import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { format } from 'date-fns'
import { Public } from 'lib/decorators'
import { R } from 'lib/utils'
import { getConfig } from 'lib/config'
import { HEALTH_CHECK } from './constants'

@Controller(HEALTH_CHECK)
export class HealthCheckController {
    private readonly build: string = getConfig().healthCheckConfig.build
    private readonly date: string

    constructor(private health: HealthCheckService) {
        const lastPart = R.last(this.build.split('-'))
        const timestamp = this.build !== 'unknown' && !R.isNil(lastPart) ? parseInt(lastPart, 10) * 1000 : null

        this.date = R.isNil(timestamp) || isNaN(timestamp) ? 'unknown' : format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss')
    }

    @Get()
    @Public()
    @HealthCheck()
    healthCheck(): Promise<HealthCheckResult> {
        return this.health.check([
            () => ({
                app: {
                    status: 'up',
                    build: this.build,
                    date: this.date,
                },
            }),
        ])
    }
}
