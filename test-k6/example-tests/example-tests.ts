import { group } from 'k6'
import { getCrocodiles } from './rest-api-tests/index.ts'

export const exampleTests = () => {
    group('exampleTests with REST API', () => {
        getCrocodiles()
    })
}
