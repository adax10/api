import { toPairs, fromPairs, isNotNil } from 'ramda'

export const hasElements = <T>(subject: T) => (Array.isArray(subject) ? subject.length > 0 : false)
export const hasKeys = <T>(subject: T) => (typeof subject === 'object' && subject !== null ? Object.keys(subject as object).length > 0 : false)
export const isDefined = <T>(subject: T): subject is NonNullable<T> => typeof subject !== 'undefined' && subject !== null

// eslint-disable-next-line functional/functional-parameters
export const all = (...args: Array<boolean>) => !args.some(arg => !arg)
export const clearObject = <T>(subject: Record<string, T>): Record<string, T> => {
    const filteredArray = toPairs(subject as { [key: string]: T }).filter(([, value]) => isNotNil(value) && value !== '')

    return fromPairs(filteredArray)
}

export {
    values,
    toPairs,
    fromPairs,
    compose,
    isNil,
    isNotNil,
    is,
    isEmpty,
    cond,
    equals,
    prop,
    descend,
    reverse,
    flatten,
    sortBy,
    empty,
    uniq,
    always,
    sort,
    T,
    sum,
    splitEvery,
    last,
} from 'ramda'
