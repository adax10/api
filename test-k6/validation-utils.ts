import { Response } from 'k6/http'
import exec from 'k6/execution'
import { extractNameFromGroup } from './utils.ts'

const logError = (validationCheck: string) => {
    const name = extractNameFromGroup()

    // eslint-disable-next-line no-console
    console.error(
        '\x1b[31m',
        name !== ''
            ? `Error for ${name} in '${exec.scenario.name}' scenario. ${validationCheck}`
            : `Error in '${exec.scenario.name}' scenario. ${validationCheck}`,
    )
}

export const executeBasicChecks = (queryName?: string) => {
    const prefix = queryName ? `[${queryName}] - ` : ''

    return {
        [`${prefix}response is status 200`]: (result: Response) => {
            const success = result.status === 200

            if (!success) {
                logError(`\nResponse contains incorrect status ${result.status}`)
            }

            return success
        },
        [`${prefix}response body doesn't contain errors`]: (result: Response) => {
            const success = !result.body || !JSON.stringify(result.body).includes('errors')

            if (!success) {
                logError(`\nResponse contains errors ${JSON.stringify(result.body)}`)
            }

            return success
        },
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (value: any) => ({
    toBeNull: (): boolean => {
        const result = value === null

        if (!result) {
            logError(`Expected ${value} to be null.`)
        }

        return result
    },
    toNotBeNull: (): boolean => {
        const result = value !== null

        if (!result) {
            logError(`Expected ${value} NOT to be null.`)
        }

        return result
    },
    toHaveLength: (length: number): boolean => {
        const result = value && value.length === length

        if (!result) {
            logError(`Expected ${JSON.stringify(value)} to have length ${length}, but got ${value?.length}.`)
        }

        return result
    },
    toNotHaveLength: (length: number): boolean => {
        const result = value && value.length !== length

        if (!result) {
            logError(`Expected ${JSON.stringify(value)} NOT to have length ${length}, but got ${value?.length}.`)
        }

        return result
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toEqual: (expected: any): boolean => {
        const isArrayComparison = Array.isArray(value) && Array.isArray(expected)

        const result = isArrayComparison
            ? value.length === expected.length && value.every((item, index) => item === expected[index])
            : value === expected

        if (!result) {
            logError(`Expected ${expected}, but got ${value}.`)
        }

        return result
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toNotEqual: (expected: any): boolean => {
        const isArrayComparison = Array.isArray(value) && Array.isArray(expected)

        const result = isArrayComparison
            ? value.length === expected.length && value.every((item, index) => item !== expected[index])
            : value !== expected

        if (!result) {
            logError(`Expected NOT ${expected}, but got ${value}.`)
        }

        return result
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toContain: (expected: any): boolean => {
        const result = Array.isArray(expected) ? expected.some(item => value.includes(item)) : value.includes(expected)

        if (!result) {
            logError(`Expected ${value} to contain ${expected}.`)
        }

        return result
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toNotContain: (expected: any): boolean => {
        const result = Array.isArray(expected) ? expected.every(item => !value.includes(item)) : !value.includes(expected)

        if (!result) {
            logError(`Expected ${value} to NOT contain ${expected}.`)
        }

        return result
    },
    toBeDefined: (): boolean => {
        const result = value !== undefined

        if (!result) {
            logError(`Expected ${value} to be defined.`)
        }

        return result
    },
    toNotBeDefined: (): boolean => {
        const result = value === undefined

        if (!result) {
            logError(`Expected ${value} to not be defined.`)
        }

        return result
    },
    toBeGreaterThanOrEqual: (expected: number): boolean => {
        if (value === undefined || value === null) {
            return false
        }

        const result = value >= expected

        if (!result) {
            logError(`Expected ${value} to be greater than or equal to ${expected}.`)
        }

        return result
    },
    toBeLessThanOrEqual: (expected: number): boolean => {
        if (value === undefined || value === null) {
            return false
        }

        const result = value <= expected

        if (!result) {
            logError(`Expected ${value} to be less than or equal to ${expected}.`)
        }

        return result
    },
})
