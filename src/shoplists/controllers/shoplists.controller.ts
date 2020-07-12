import { Inject, Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { ShoplistService } from '../services/shoplists.service'
import {
  ShoplistDto,
  ShoplistUpsertDto
} from '../interfaces/shoplists.dto'

@Controller('/shoplists')
export class ShoplistsController {
  constructor (
    @Inject(ShoplistService) private readonly shoplistService: ShoplistService
  ) {}

  @Get()
  async list (): Promise<Array<ShoplistDto>> {
    return this.shoplistService.listShoplists({
      ownerId: 'default_user'
    })
  }

  @Post()
  async create (
    @Body() payload: ShoplistUpsertDto
  ): Promise<ShoplistDto> {
    return this.shoplistService.upsertShoplist({
      ...payload,
      id: uuid(),
      ownerId: 'default_user'
    })
  }

  @Get(':shoplistId')
  async get (
    @Param('shoplistId') shoplistId: string
  ): Promise<ShoplistDto> {
    const [list] = await this.shoplistService.listShoplists({
      id: shoplistId,
      ownerId: 'default_user'
    })

    return list
  }

  @Put(':shoplistId')
  async update (
    @Param('shoplistId') shoplistId: string,
    @Body() payload: ShoplistUpsertDto
  ): Promise<ShoplistDto> {
    return this.shoplistService.upsertShoplist({
      ...payload,
      id: shoplistId,
      ownerId: 'default_user'
    })
  }

  @Delete(':shoplistId')
  async delete (
    @Param('shoplistId') shoplistId: string
  ): Promise<void> {
    return this.shoplistService.deleteShoplists({
      id: shoplistId,
      ownerId: 'default_user'
    })
  }
}
