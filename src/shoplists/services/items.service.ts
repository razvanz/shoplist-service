import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Item } from '../entities/item.entity'
import {
  ItemDto,
  ItemQueryDto,
  ItemCreateDto,
  ItemUpdateDto
} from '../interfaces/items.dto'

@Injectable()
export class ItemsService {
  constructor (
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>
  ) {}

  async listItems (query: ItemQueryDto): Promise<ItemDto[]> {
    return this.itemRepository.find(query)
  }

  async upsertItem (item: ItemCreateDto | ItemUpdateDto): Promise<ItemDto> {
    return this.itemRepository.save(item)
  }

  async deleteItems (query: string | string[] | ItemQueryDto): Promise<void> {
    await this.itemRepository.delete(query)
  }
}
