import { Test, TestingModule } from '@nestjs/testing'
import * as TypeMoq from 'typemoq'
import { ShoplistsService } from '../services/shoplists.service'
import { ItemsService } from '../services/items.service'
import { ItemsController } from './items.controller'

describe.only('AppController', () => {
  const item1 = {
    id: 'item1',
    name: 'Item 1',
    shoplistId: 'shoplist1'
  }
  let controller: ItemsController

  const setupBeforeAll = (setup: (mock: TypeMoq.IMock<ItemsService>) => void): void => {
    const shoplistServiceMock = TypeMoq.Mock.ofType<ShoplistsService>()
    const itemServiceMock = TypeMoq.Mock.ofType<ItemsService>()

    beforeAll(async () => {
      setup(itemServiceMock)
      // make it work with NestJS: https://github.com/florinn/typemoq/issues/67
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shoplistServiceMock.setup((x: any) => x.then).returns(() => true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      itemServiceMock.setup((x: any) => x.then).returns(() => true)

      const app: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: 'ShoplistsService',
            useValue: shoplistServiceMock.object
          },
          {
            provide: 'ItemsService',
            useValue: itemServiceMock.object
          }
        ],
        controllers: [
          ItemsController
        ]
      }).compile()

      controller = app.get<ItemsController>(ItemsController)
    })
  }

  describe('list', () => {
    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.listItems(TypeMoq.It.isObjectWith({ shoplistId: item1.shoplistId })))
          .returns(() => Promise.resolve([item1]))
      })

      it('returns matching', () => {
        expect(controller.list(item1.shoplistId)).resolves.toEqual([item1])
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.listItems(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        expect(controller.list(item1.shoplistId)).rejects.toBeDefined()
      })
    })
  })

  describe('get', () => {
    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.listItems(TypeMoq.It.isObjectWith({
            id: item1.id,
            shoplistId: item1.shoplistId
          })))
          .returns(() => Promise.resolve([item1]))
      })

      it('returns matching', () => {
        expect(controller.get(item1.shoplistId, item1.id)).resolves.toEqual(item1)
      })
    })

    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.listItems(TypeMoq.It.isObjectWith({
            id: item1.id,
            shoplistId: item1.shoplistId
          })))
          .returns(() => Promise.resolve([]))
      })

      it('returns matching', () => {
        expect(controller.get(item1.shoplistId, item1.id)).resolves.toEqual(undefined)
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.listItems(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        expect(controller.get(item1.shoplistId, item1.id)).rejects.toBeDefined()
      })
    })
  })

  describe('create', () => {
    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.upsertItem(TypeMoq.It.isObjectWith({
            shoplistId: item1.shoplistId,
            name: item1.name
          })))
          .returns(() => Promise.resolve(item1))
      })

      it('returns created', () => {
        expect(
          controller.create(item1.shoplistId, { name: item1.name, shoplistId: item1.shoplistId })
        ).resolves.toEqual(item1)
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.upsertItem(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        expect(
          controller.create(item1.shoplistId, { name: item1.name, shoplistId: item1.shoplistId })
        ).rejects.toBeDefined()
      })
    })
  })

  describe('update', () => {
    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.upsertItem(TypeMoq.It.isObjectWith({
            id: item1.id,
            shoplistId: item1.shoplistId,
            name: 'Updated name'
          })))
          .returns(() => Promise.resolve({ ...item1, name: 'Updated name' }))
      })

      it('returns updated', () => {
        expect(
          controller.update(
            item1.shoplistId,
            item1.id,
            { name: 'Updated name' }
          )
        ).resolves.toEqual({ ...item1, name: 'Updated name' })
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.upsertItem(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        expect(
          controller.update(
            item1.shoplistId,
            item1.id,
            { name: 'Updated name' }
          )
        ).rejects.toBeDefined()
      })
    })
  })

  describe('delete', () => {
    describe('success', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.deleteItems(TypeMoq.It.isObjectWith({
            id: item1.id,
            shoplistId: item1.shoplistId
          })))
          .returns(() => Promise.resolve())
      })

      it('deletes', () => {
        expect(
          controller.delete(item1.shoplistId, item1.id)
        ).resolves.toBeUndefined()
      })
    })

    describe('error', () => {
      setupBeforeAll((mock: TypeMoq.IMock<ItemsService>) => {
        mock
          .setup(x => x.deleteItems(TypeMoq.It.isAny()))
          .throws(new Error('Failed'))
      })

      it('throws error', () => {
        expect(
          controller.delete(item1.shoplistId, item1.id)
        ).rejects.toBeDefined()
      })
    })
  })
})
