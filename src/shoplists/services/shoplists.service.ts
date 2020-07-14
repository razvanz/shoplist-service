import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import _ from 'lodash'
import { Repository } from 'typeorm'
import { Shoplist } from '../entities/shoplist.entity'
import {
  ShoplistQueryDto,
  ShoplistUpsertDto
} from '../interfaces/shoplists.dto'
import { ItemsService } from './items.service'

@Injectable()
export class ShoplistsService {
  constructor (
    @InjectRepository(Shoplist) private readonly shoplistRepository: Repository<Shoplist>,
    @Inject(ItemsService) private readonly itemsService: ItemsService
  ) {}

  async listShoplists (query?: ShoplistQueryDto): Promise<Array<Shoplist>> {
    return await this.shoplistRepository.find({
      where: query,
      relations: ['items']
    })
  }

  async upsertShoplist (shoplistDto: ShoplistUpsertDto): Promise<Shoplist> {
    return await this.shoplistRepository.save({ ...shoplistDto })
  }

  async deleteShoplists (query: ShoplistQueryDto): Promise<void> {
    const lists = await this.listShoplists(query)
    const itemIds = _.flatMap(lists, list => list.items.map(item => item.id))

    if (!lists) return

    await Promise.all([
      itemIds ? this.itemsService.deleteItems(itemIds) : Promise.resolve(),
      this.shoplistRepository.delete(lists.map(list => list.id))
    ])
  }
}
