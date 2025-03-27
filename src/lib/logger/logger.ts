import morgan from 'morgan'
import { R, hasBody } from '../utils'

/* eslint-disable 
    @typescript-eslint/no-unsafe-argument,
    @typescript-eslint/strict-boolean-expressions 
*/

morgan.token('request-info', req => {
    // @ts-expect-error this is expected
    const { body, query, method } = req

    if (!method) {
        return '[unsupported method]'
    }

    if (!hasBody(method)) {
        return `Q[${JSON.stringify(query)}]`
    }

    const bodyShortened = body ? clearBodyObject(body) : null

    return `B[${JSON.stringify(bodyShortened)}]`
})

const toReadableLog = (value: unknown) => (value && R.is(String, value) ? value.slice(0, 100) : value)

const clearBodyObject = (object: Record<string, unknown>): Record<string, unknown> =>
    R.fromPairs<string, unknown>(
        R.toPairs<Record<string, unknown>>(object).map(([key, value]) => {
            if (key.toLowerCase().includes('password') || key.toLowerCase().includes('passwd')) {
                return [key, '********']
            }

            if (R.is(Object, value)) {
                return [key, clearBodyObject(value)]
            }

            return [key, toReadableLog(value)]
        }),
    )
