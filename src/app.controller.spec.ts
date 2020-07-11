import { Test, TestingModule } from '@nestjs/testing'
import * as TypeMoq from 'typemoq'
import { Connection } from 'typeorm'
import { AppController } from './app.controller'

describe('AppController', () => {
  let appController: AppController
  let connectedState = false

  beforeAll(async () => {
    const connectionMock = TypeMoq.Mock.ofType<Connection>()

    connectionMock.setup(x => x.isConnected).returns(() => connectedState)

    // make it work with NestJS: https://github.com/florinn/typemoq/issues/67
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    connectionMock.setup((x: any) => x.then).returns(() => true)

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'Connection',
          useValue: connectionMock.object
        }
      ],
      controllers: [
        AppController
      ]
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('getHealth', () => {
    it('disconnected: should throw error', () => {
      connectedState = false

      expect(() => appController.getHealth()).toThrow('Unhealthy')
    })

    it('connected: should return "OK"', () => {
      connectedState = true

      expect(appController.getHealth()).toBe('OK')
    })
  })
})
