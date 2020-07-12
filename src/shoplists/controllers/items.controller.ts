import { Inject, Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { ItemService } from '../services/items.service'
import {
  ItemDto,
  ItemCreateDto,
  ItemUpdateDto
} from '../interfaces/items.dto'

@Controller('/shoplists/:shoplistId/items')
export class ItemsController {
  constructor (
    @Inject(ItemService) private readonly itemService: ItemService
  ) {}

  @Get()
  async list (
    @Param('shoplistId') shoplistId: string
  ): Promise<Array<ItemDto>> {
    return this.itemService.listItems({ shoplistId })
  }

  @Post()
  async create (
    @Param('shoplistId') shoplistId: string,
    @Body() payload: ItemCreateDto
  ): Promise<ItemDto> {
    return this.itemService.upsertItem({ ...payload, shoplistId, id: uuid() })
  }

  @Get(':itemId')
  async get (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string
  ): Promise<ItemDto> {
    const [item] = await this.itemService.listItems({ shoplistId, id: itemId })

    return item
  }

  @Put(':itemId')
  async update (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string,
    @Body() payload: ItemUpdateDto
  ): Promise<ItemDto> {
    return this.itemService.upsertItem({ ...payload, shoplistId, id: itemId })
  }

  @Delete(':itemId')
  async delete (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string
  ): Promise<void> {
    return this.itemService.deleteItems({ shoplistId, id: itemId })
  }
}
