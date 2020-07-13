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
import { User } from '../decorators/user.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { ShoplistsService } from '../services/shoplists.service'
import {
  UserDto
} from '../../users/interfaces/users.dto'
import {
  ShoplistDto,
  ShoplistUpsertDto
} from '../interfaces/shoplists.dto'

@ApiBearerAuth()
@ApiTags('shoplists')
@ApiResponse({
  status: 401,
  description: 'Unauthorized'
})
@Controller('/shoplists')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShoplistsController {
  constructor (
    @Inject(ShoplistsService) private readonly shoplistsService: ShoplistsService
  ) {}

  @Get()
  @ApiOperation({ summary: 'List shoplists' })
  @ApiResponse({
    status: 200,
    description: 'The list of owned shoplists, for user.role = client, or all system shoplists for user.role = buyer',
    type: [ShoplistDto]
  })
  @SetMetadata('roles', [UserRole.Client, UserRole.Buyer])
  async list (
    @User() user: UserDto
  ): Promise<Array<ShoplistDto>> {
    return this.shoplistsService.listShoplists(
      // For clients, limit shoplists to what they own
      user.role === UserRole.Client ? { ownerId: user.id } : {}
    )
  }

  @Post()
  @ApiOperation({ summary: 'Create a new shoplist' })
  @ApiResponse({
    status: 201,
    description: 'Create the shoplist and returns it',
    type: ShoplistDto
  })
  @SetMetadata('roles', [UserRole.Client])
  async create (
    @User() user: UserDto,
    @Body() payload: ShoplistUpsertDto
  ): Promise<ShoplistDto> {
    return this.shoplistsService.upsertShoplist({
      ...payload,
      id: uuid(),
      ownerId: user.id
    })
  }

  @Get(':shoplistId')
  @ApiOperation({ summary: 'Retrieve a shoplist' })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested shoplist',
    type: ShoplistDto
  })
  @ApiResponse({
    status: 404,
    description: 'Shoplist not found'
  })
  @SetMetadata('roles', [UserRole.Client, UserRole.Buyer])
  async get (
    @User() user: UserDto,
    @Param('shoplistId') shoplistId: string
  ): Promise<ShoplistDto> {
    const [list] = await this.shoplistsService.listShoplists({
      id: shoplistId,
      ...(user.role === UserRole.Client ? { ownerId: user.id } : {})
    })

    return list
  }

  @Put(':shoplistId')
  @ApiOperation({ summary: 'Update a shoplist' })
  @ApiResponse({
    status: 200,
    description: 'Updates the shoplist and returns it',
    type: ShoplistDto
  })
  @ApiResponse({
    status: 404,
    description: 'Shoplist not found'
  })
  @SetMetadata('roles', [UserRole.Client])
  async update (
    @User() user: UserDto,
    @Param('shoplistId') shoplistId: string,
    @Body() payload: ShoplistUpsertDto
  ): Promise<ShoplistDto> {
    return this.shoplistsService.upsertShoplist({
      ...payload,
      id: shoplistId,
      ownerId: user.id
    })
  }

  @Delete(':shoplistId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a shoplist' })
  @ApiResponse({
    status: 204,
    description: 'Deletes the shoplist'
  })
  @ApiResponse({
    status: 404,
    description: 'Shoplist not found'
  })
  @SetMetadata('roles', [UserRole.Client])
  async delete (
    @User() user: UserDto,
    @Param('shoplistId') shoplistId: string
  ): Promise<void> {
    return this.shoplistsService.deleteShoplists({
      id: shoplistId,
      ownerId: user.id
    })
  }
}
