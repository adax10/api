import { HttpMethods } from '../common'

export const hasBody = (method: string) => method !== HttpMethods.GET
