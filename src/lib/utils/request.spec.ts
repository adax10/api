import { HttpMethods } from '../common'
import { hasBody } from './request'

describe('request utils', () => {
    describe('hasBody', () => {
        it('should return true if given http method supports body', () => {
            const method1 = HttpMethods.POST
            const method2 = HttpMethods.PATCH
            const method3 = HttpMethods.PUT
            const method4 = HttpMethods.DELETE

            expect(hasBody(method1)).toEqual(true)
            expect(hasBody(method2)).toEqual(true)
            expect(hasBody(method3)).toEqual(true)
            expect(hasBody(method4)).toEqual(true)
        })

        it('should return false if given http method doesnt supports body', () => {
            const method1 = HttpMethods.GET

            expect(hasBody(method1)).toEqual(false)
        })
    })
})
