import { v4 as uuid } from 'uuid'
import {
  Inject,
  Controller,
  Get, Post, Put, Delete,
  Param, Body,
  UseGuards, SetMetadata
} from '@nestjs/common'
import { UserRole } from '../../users/entities/user.entity'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { ShoplistOwnershipGuard } from '../guards/shoplist-ownership.guard'
import { ItemsService } from '../services/items.service'
import {
  ItemDto,
  ItemCreateDto,
  ItemUpdateDto
} from '../interfaces/items.dto'

@Controller('/shoplists/:shoplistId/items')
@UseGuards(JwtAuthGuard, RolesGuard, ShoplistOwnershipGuard)
export class ItemsController {
  constructor (
    @Inject(ItemsService) private readonly itemsService: ItemsService
  ) {}

  @Get()
  @SetMetadata('roles', [UserRole.Client, UserRole.Buyer])
  async list (
    @Param('shoplistId') shoplistId: string
  ): Promise<Array<ItemDto>> {
    return this.itemsService.listItems({ shoplistId })
  }

  @Post()
  @SetMetadata('roles', [UserRole.Client])
  async create (
    @Param('shoplistId') shoplistId: string,
    @Body() payload: ItemCreateDto
  ): Promise<ItemDto> {
    return this.itemsService.upsertItem({ ...payload, shoplistId, id: uuid() })
  }

  @Get(':itemId')
  @SetMetadata('roles', [UserRole.Client, UserRole.Buyer])
  async get (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string
  ): Promise<ItemDto> {
    const [item] = await this.itemsService.listItems({
      shoplistId,
      id: itemId
    })

    return item
  }

  @Put(':itemId')
  @SetMetadata('roles', [UserRole.Client])
  async update (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string,
    @Body() payload: ItemUpdateDto
  ): Promise<ItemDto> {
    return this.itemsService.upsertItem({ ...payload, shoplistId, id: itemId })
  }

  @Delete(':itemId')
  @SetMetadata('roles', [UserRole.Client])
  async delete (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string
  ): Promise<void> {
    return this.itemsService.deleteItems({ shoplistId, id: itemId })
  }
}
