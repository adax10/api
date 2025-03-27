import { RefinedParams, RefinedResponse } from 'k6/http'

export type SetUpParameters = {
    requestUrl: string
    module: string
}

export type TextRefinedResponse = RefinedResponse<'text'>
export type RequestOptions = RefinedParams<'text'>

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
}

export type RequestParams = {
    method: HttpMethods
    url: string
    payload?: string
    requestOptions: RequestOptions
}
