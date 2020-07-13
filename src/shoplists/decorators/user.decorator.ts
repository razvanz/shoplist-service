import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserDto } from '../../users/interfaces/users.dto'

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto => {
    const req = ctx.switchToHttp().getRequest()

    return req.user as UserDto
  }
)
