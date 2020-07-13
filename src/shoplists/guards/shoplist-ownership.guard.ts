import { Inject, Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { UserRole } from '../../users/entities/user.entity'
import { UserDto } from '../../users/interfaces/users.dto'
import { ShoplistsService } from '../services/shoplists.service'

@Injectable()
export class ShoplistOwnershipGuard implements CanActivate {
  constructor (
    @Inject(ShoplistsService) private readonly shoplistsService: ShoplistsService
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const user = req.user as UserDto

    // If the user is a client, he must own the shoplist he's accessing
    const [shoplist] = await this.shoplistsService.listShoplists({
      id: req.params.shoplistId,
      ...(user.role === UserRole.Client ? { ownerId: user.id } : {})
    })

    if (!shoplist) throw new NotFoundException()

    return true
  }
}
