import http from 'k6/http'
import exec from 'k6/execution'
import { sleep } from 'k6'
import { MODULE } from './constants.ts'
import { HttpMethods, RequestParams, TextRefinedResponse } from './types.ts'

const validateParameters = (module?: string) => {
    if (module && module !== '' && !MODULE.includes(module)) {
        throw new Error('Invalid module name')
    }
}

export const createScenarioKey = (module: string) => {
    validateParameters(module)

    if (module === '' || !module) {
        return 'all-tests'
    }

    return `${module}`
}

export const extractNameFromGroup = () => {
    const group = exec.vu.metrics.tags.group
    const name = group.toString().split('::').at(2)

    return name ?? ''
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const test = (name: string, callback: (name: string) => any) => {
    const useInfoLogs = __ENV.USE_INFO_LOGS

    if (useInfoLogs === 'true') {
        // eslint-disable-next-line no-console
        console.log(`Executing ${extractNameFromGroup()} - '${name}'`)
    }

    const result = callback(name)
    sleep(1)

    return result
}

const executeRequest = (requestParams: RequestParams) => {
    const { method, url, payload, requestOptions } = requestParams

    switch (method) {
        case HttpMethods.GET:
            return http.get(url, requestOptions)
        case HttpMethods.POST:
            return http.post(url, payload, requestOptions)
        case HttpMethods.PUT:
            return http.put(url, payload, requestOptions)
        case HttpMethods.PATCH:
            return http.patch(url, payload, requestOptions)
        case HttpMethods.DELETE:
            return http.del(url, payload, requestOptions)
        default:
            throw new Error(`Unsupported HTTP method: ${method}`)
    }
}

export const executeAndParseRequest = <T>(requestParams: RequestParams): T => {
    const response: TextRefinedResponse = executeRequest(requestParams)

    return JSON.parse(response.body) as T
}
