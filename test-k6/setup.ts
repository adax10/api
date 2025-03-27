import http from 'k6/http'
import { check } from 'k6'
import { Scenario, Options } from 'k6/options'
import { exampleTests } from './example-tests/index.ts'
import { SetUpParameters } from './types.ts'
import { createScenarioKey } from './utils.ts'
import { executeBasicChecks } from './validation-utils.ts'

const virtualUsersNumber = parseInt(__ENV.VIRTUAL_USERS_NUMBER, 10)
const iterations = parseInt(__ENV.ITERATIONS, 10)

const scenarioKey = createScenarioKey(__ENV.MODULE)

const createScenario = (exec: string): Scenario => ({
    executor: 'per-vu-iterations',
    vus: virtualUsersNumber,
    iterations,
    exec,
    startTime: '2s',
})

export const SCENARIOS: Record<string, Scenario> = {
    exampleTests: createScenario('executeExampleTests'),
}

export const executeExampleTests = exampleTests

export const options: Options = {
    thresholds: {
        checks: ['rate==1.00'],
        'checks{scenario:healthcheck}': [
            {
                threshold: 'rate==1.00',
                abortOnFail: true, // note: if healthcheck fails, do not run other tests
            },
        ],
        'checks{scenario:setup}': [
            {
                threshold: 'rate==1.00',
                abortOnFail: true, // note: if setup fails, do not run other tests
            },
        ],
    },
    scenarios: {
        healthcheck: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1,
            exec: 'default',
        },
        ...(scenarioKey === 'all-tests'
            ? SCENARIOS
            : {
                  [scenarioKey]: SCENARIOS[scenarioKey],
              }),
    },
}

export const setup = (): SetUpParameters => {
    const requestUrl = __ENV.REQUEST_API_URL
    const module = __ENV.MODULE

    return {
        requestUrl,
        module,
    }
}

export default (data: SetUpParameters) => {
    const { requestUrl } = data
    const response = http.get(`${requestUrl}/health-check`)

    check(response, executeBasicChecks('HealthCheck'))
}
