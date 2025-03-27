import {
    values,
    toPairs,
    fromPairs,
    compose,
    isNil,
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

const hasElements = <T>(subject: T) => (Array.isArray(subject) ? subject.length > 0 : false)
const hasKeys = <T>(subject: T) => (typeof subject === 'object' && subject !== null ? Object.keys(subject as object).length > 0 : false)
const isDefined = <T>(subject: T): subject is NonNullable<T> => typeof subject !== 'undefined' && subject !== null
const notNil = <T>(subject: T) => !isNil(subject)
// eslint-disable-next-line functional/functional-parameters
const all = (...args: Array<boolean>) => !args.some(arg => !arg)
const clearObject = <T>(subject: Record<string, T>): Record<string, T> => {
    const filteredArray = toPairs(subject as { [key: string]: T }).filter(([, value]) => notNil(value) && value !== '')

    return fromPairs(filteredArray)
}

export {
    all,
    values,
    hasKeys,
    clearObject,
    toPairs,
    notNil,
    isNil,
    is,
    hasElements,
    isEmpty,
    cond,
    equals,
    compose,
    isDefined,
    flatten,
    empty,
    always,
    uniq,
    T,
    prop,
    sortBy,
    reverse,
    descend,
    sort,
    fromPairs,
    splitEvery,
    sum,
    last,
}
