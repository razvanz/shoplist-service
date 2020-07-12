import { Inject, Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { ItemsService } from '../services/items.service'
import {
  ItemDto,
  ItemCreateDto,
  ItemUpdateDto
} from '../interfaces/items.dto'

@Controller('/shoplists/:shoplistId/items')
export class ItemsController {
  constructor (
    @Inject(ItemsService) private readonly itemsService: ItemsService
  ) {}

  @Get()
  async list (
    @Param('shoplistId') shoplistId: string
  ): Promise<Array<ItemDto>> {
    return this.itemsService.listItems({ shoplistId })
  }

  @Post()
  async create (
    @Param('shoplistId') shoplistId: string,
    @Body() payload: ItemCreateDto
  ): Promise<ItemDto> {
    return this.itemsService.upsertItem({ ...payload, shoplistId, id: uuid() })
  }

  @Get(':itemId')
  async get (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string
  ): Promise<ItemDto> {
    const [item] = await this.itemsService.listItems({ shoplistId, id: itemId })

    return item
  }

  @Put(':itemId')
  async update (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string,
    @Body() payload: ItemUpdateDto
  ): Promise<ItemDto> {
    return this.itemsService.upsertItem({ ...payload, shoplistId, id: itemId })
  }

  @Delete(':itemId')
  async delete (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string
  ): Promise<void> {
    return this.itemsService.deleteItems({ shoplistId, id: itemId })
  }
}
