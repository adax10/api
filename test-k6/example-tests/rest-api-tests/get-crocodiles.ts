import { check, group } from 'k6'
import http from 'k6/http'
import { executeAndParseRequest, test } from '../../utils.ts'
import { HttpMethods, TextRefinedResponse } from '../../types.ts'
import { executeBasicChecks, validate } from '../../validation-utils.ts'
import { Crocodile } from './types.ts'

export const getCrocodiles = () => {
    const url = 'https://test-api.k6.io/public/crocodiles/'

    const groupName = getCrocodiles.name
    const headers = {
        'Content-Type': 'application/json',
    }
    const requestOptions = {
        headers,
        tags: {
            name: groupName,
        },
    }

    return group(groupName, () => {
        test(`response is status 200 and response body doesn't contain errors`, () => {
            const response: TextRefinedResponse = http.get(url, requestOptions)

            check(response, executeBasicChecks())
        })

        test('should return non-empty response and should contain valid sex and age for each crocodile', testName => {
            const response = executeAndParseRequest<Array<Crocodile>>({
                method: HttpMethods.GET,
                url,
                requestOptions,
            })

            check(response, {
                [testName]: (response: Array<Crocodile>) => {
                    const conditions = [
                        validate(response).toNotHaveLength(0),
                        response.every(item => validate(item.sex).toContain(['M', 'F']) && validate(item.age).toNotEqual(0)),
                    ]

                    return conditions.every(Boolean)
                },
            })
        })
    })
}
