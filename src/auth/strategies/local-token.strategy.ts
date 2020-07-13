import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local-token'
import { AuthService } from '../services/auth.service'
import { UserDto } from '../../users/interfaces/users.dto'

@Injectable()
export class LocalTokenStrategy extends PassportStrategy(Strategy, 'local-token') {
  constructor (
    @Inject('AuthService') private readonly authService: AuthService
  ) {
    super({ tokenField: 'token' })
  }

  async validate (token: string): Promise<UserDto> {
    const user = await this.authService.validateUser(token)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
