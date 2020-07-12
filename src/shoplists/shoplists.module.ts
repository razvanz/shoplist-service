import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './entities/item.entity'
import { Shoplist } from './entities/shoplist.entity'
import { ItemService } from './services/items.service'
import { ShoplistService } from './services/shoplists.service'
import { ItemsController } from './controllers/items.controller'
import { ShoplistsController } from './controllers/shoplists.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shoplist,
      Item
    ])
  ],
  providers: [
    ShoplistService,
    ItemService
  ],
  controllers: [
    ShoplistsController,
    ItemsController
  ]
})
export class ShoplistsModule {}
