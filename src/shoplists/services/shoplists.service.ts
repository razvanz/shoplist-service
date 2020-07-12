import { Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import _ from 'lodash'
import { Repository } from 'typeorm'
import { Shoplist } from '../entities/shoplist.entity'
import {
  ShoplistQueryDto,
  ShoplistUpsertDto
} from '../interfaces/shoplists.dto'
import { ItemService } from './items.service'

export class ShoplistService {
  constructor (
    @InjectRepository(Shoplist) private readonly shoplistRepository: Repository<Shoplist>,
    @Inject(ItemService) private readonly itemService: ItemService
  ) {}

  async listShoplists (query?: ShoplistQueryDto): Promise<Array<Shoplist>> {
    return await this.shoplistRepository.find({
      where: query,
      relations: ['items']
    })
  }

  async upsertShoplist (shoplistDto: ShoplistUpsertDto): Promise<Shoplist> {
    // if (shoplistDto.id) {
    //   await this.itemService.deleteItems({ shoplist: { id: shoplistDto.id } })
    // }

    const items = await Promise.all(
      (shoplistDto.items || []).map(item => this.itemService.upsertItem(item))
    )

    return await this.shoplistRepository.save({ ...shoplistDto, items })
  }

  async deleteShoplists (query: ShoplistQueryDto): Promise<void> {
    const lists = await this.listShoplists(query)

    if (!lists) return

    await Promise.all([
      this.itemService.deleteItems(_.flatMap(lists, list => list.items.map(item => item.id))),
      this.shoplistRepository.delete(lists.map(list => list.id))
    ])
  }
}
