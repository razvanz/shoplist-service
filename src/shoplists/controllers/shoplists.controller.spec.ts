import { Test, TestingModule } from '@nestjs/testing'
import * as TypeMoq from 'typemoq'
import { UserDto } from '../../users/interfaces/users.dto'
import { UserRole } from '../../users/entities/user.entity'
import { ShoplistsService } from '../services/shoplists.service'
import { ShoplistsController } from './shoplists.controller'

describe('AppController', () => {
  const shoplist1 = {
    id: 'shoplist1',
    name: 'Shoplist 1',
    ownerId: 'user1',
    items: []
  }
  let controller: ShoplistsController

  const setupBeforeAll = (setup: (mock: TypeMoq.IMock<ShoplistsService>) => void): void => {
    const shoplistServiceMock = TypeMoq.Mock.ofType<ShoplistsService>()

    beforeAll(async () => {
      setup(shoplistServiceMock)
      // make it work with NestJS: https://github.com/florinn/typemoq/issues/67
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shoplistServiceMock.setup((x: any) => x.then).returns(() => true)

      const app: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: 'ShoplistsService',
            useValue: shoplistServiceMock.object
          }
        ],
        controllers: [
          ShoplistsController
        ]
      }).compile()

      controller = app.get<ShoplistsController>(ShoplistsController)
    })
  }

  describe('list', () => {
    describe('success - client', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.listShoplists(TypeMoq.It.isObjectWith({ ownerId: shoplist1.ownerId })))
          .returns(() => Promise.resolve([
            shoplist1
          ]))
      })

      it('returns matching', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)
        userMock.setup(x => x.role).returns(() => UserRole.Client)

        expect(
          controller.list(userMock.object)
        ).resolves.toEqual([shoplist1])
      })
    })

    describe('success - buyer', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.listShoplists(TypeMoq.It.isValue({})))
          .returns(() => Promise.resolve([]))
      })

      it('returns empty list', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.role).returns(() => UserRole.Buyer)

        expect(
          controller.list(userMock.object)
        ).resolves.toEqual([])
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.listShoplists(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.role).returns(() => UserRole.Buyer)

        expect(
          controller.list(userMock.object)
        ).rejects.toBeDefined()
      })
    })
  })

  describe('get', () => {
    describe('success - client', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.listShoplists(TypeMoq.It.isObjectWith({
            id: shoplist1.id,
            ownerId: shoplist1.ownerId
          })))
          .returns(() => Promise.resolve([shoplist1]))
      })

      it('returns matching', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)
        userMock.setup(x => x.role).returns(() => UserRole.Client)

        expect(
          controller.get(userMock.object, shoplist1.id)
        ).resolves.toEqual(shoplist1)
      })
    })

    describe('success - buyer', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.listShoplists(TypeMoq.It.isObjectWith({
            id: shoplist1.id
          })))
          .returns(() => Promise.resolve([shoplist1]))
      })

      it('returns empty list', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)
        userMock.setup(x => x.role).returns(() => UserRole.Buyer)

        expect(
          controller.get(userMock.object, shoplist1.id)
        ).resolves.toEqual(shoplist1)
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.listShoplists(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.role).returns(() => UserRole.Buyer)

        expect(
          controller.get(userMock.object, shoplist1.id)
        ).rejects.toBeDefined()
      })
    })
  })

  describe('create', () => {
    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.upsertShoplist(TypeMoq.It.isObjectWith({
            name: shoplist1.name,
            ownerId: shoplist1.ownerId
          })))
          .returns(() => Promise.resolve(shoplist1))
      })

      it('returns created', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)

        expect(
          controller.create(userMock.object, { name: shoplist1.name })
        ).resolves.toEqual(shoplist1)
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.upsertShoplist(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)

        expect(
          controller.create(userMock.object, { name: shoplist1.name })
        ).rejects.toBeDefined()
      })
    })
  })

  describe('update', () => {
    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.upsertShoplist(TypeMoq.It.isObjectWith({
            name: 'Updated name',
            id: shoplist1.id,
            ownerId: shoplist1.ownerId
          })))
          .returns(() => Promise.resolve({ ...shoplist1, name: 'Updated name' }))
      })

      it('returns updated', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)

        expect(
          controller.update(
            userMock.object,
            shoplist1.id,
            { name: 'Updated name' }
          )
        ).resolves.toEqual({ ...shoplist1, name: 'Updated name' })
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.upsertShoplist(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)

        expect(
          controller.update(
            userMock.object,
            shoplist1.id,
            { name: 'Updated name' }
          )
        ).rejects.toBeDefined()
      })
    })
  })

  describe('delete', () => {
    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.deleteShoplists(TypeMoq.It.isObjectWith({
            id: shoplist1.id,
            ownerId: shoplist1.ownerId
          })))
          .returns(() => Promise.resolve())
      })

      it('deletes', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)

        expect(
          controller.delete(userMock.object, shoplist1.id)
        ).resolves.toBeUndefined()
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ShoplistsService>) => {
        mock
          .setup(x => x.deleteShoplists(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        const userMock = TypeMoq.Mock.ofType<UserDto>(undefined)

        userMock.setup(x => x.id).returns(() => shoplist1.ownerId)

        expect(
          controller.delete(
            userMock.object,
            shoplist1.id
          )
        ).rejects.toBeDefined()
      })
    })
  })
})
