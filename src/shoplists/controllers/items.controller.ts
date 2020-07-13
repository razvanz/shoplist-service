import { v4 as uuid } from 'uuid'
import {
  Inject,
  Controller,
  Get, Post, Put, Delete,
  HttpCode,
  Param, Body,
  UseGuards, SetMetadata
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
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

@ApiBearerAuth()
@ApiTags('items')
@ApiResponse({
  status: 401,
  description: 'Unauthorized'
})
@ApiResponse({
  status: 404,
  description: 'Shoplist not found'
})
@Controller('/shoplists/:shoplistId/items')
@UseGuards(JwtAuthGuard, RolesGuard, ShoplistOwnershipGuard)
export class ItemsController {
  constructor (
    @Inject(ItemsService) private readonly itemsService: ItemsService
  ) {}

  @Get()
  @ApiOperation({ summary: 'List shoplist items' })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a list of shoplist items',
    type: [ItemDto]
  })
  @SetMetadata('roles', [UserRole.Client, UserRole.Buyer])
  async list (
    @Param('shoplistId') shoplistId: string
  ): Promise<Array<ItemDto>> {
    return this.itemsService.listItems({ shoplistId })
  }

  @Post()
  @ApiOperation({ summary: 'Create a new shoplist item' })
  @ApiResponse({
    status: 201,
    description: 'Retrieves a list of shoplist items',
    type: ItemDto
  })
  @SetMetadata('roles', [UserRole.Client])
  async create (
    @Param('shoplistId') shoplistId: string,
    @Body() payload: ItemCreateDto
  ): Promise<ItemDto> {
    return this.itemsService.upsertItem({ ...payload, shoplistId, id: uuid() })
  }

  @Get(':itemId')
  @ApiOperation({ summary: 'Fetch a shoplist item' })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested shoplist item',
    type: ItemDto
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found'
  })
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
  @ApiOperation({ summary: 'Update a shoplist item' })
  @ApiResponse({
    status: 200,
    description: 'Updates the shoplist item and returns it',
    type: ItemDto
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found'
  })
  @SetMetadata('roles', [UserRole.Client])
  async update (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string,
    @Body() payload: ItemUpdateDto
  ): Promise<ItemDto> {
    return this.itemsService.upsertItem({ ...payload, shoplistId, id: itemId })
  }

  @Delete(':itemId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a shoplist item' })
  @ApiResponse({
    status: 204,
    description: 'Deletes the shoplist item'
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found'
  })
  @SetMetadata('roles', [UserRole.Client])
  async delete (
    @Param('shoplistId') shoplistId: string,
    @Param('itemId') itemId: string
  ): Promise<void> {
    return this.itemsService.deleteItems({ shoplistId, id: itemId })
  }
}
