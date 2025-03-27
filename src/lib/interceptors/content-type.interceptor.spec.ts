import { Test, TestingModule } from '@nestjs/testing'
import supertest from 'supertest'
import { App } from 'supertest/types'
import { FakeController } from '../test'
import { ContentTypeInterceptor } from './content-type.interceptor'

describe('ContentTypeInterceptor', () => {
    const getHttpServer = async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [FakeController],
        }).compile()

        const app = moduleFixture.createNestApplication()

        app.useGlobalInterceptors(new ContentTypeInterceptor())

        app.init()

        const httpServer: App = app.getHttpServer()

        return {
            httpServer,
            close: () => app.close(),
        }
    }

    it('should allow http post method with json body', async () => {
        const { httpServer, close } = await getHttpServer()

        return supertest(httpServer).post('/fake').send({}).expect(201).then(close)
    })

    it('should block http post method with any body different than json', async () => {
        const { httpServer, close } = await getHttpServer()

        await supertest(httpServer).post('/fake').send('').expect(415).then(close)
    })
})
