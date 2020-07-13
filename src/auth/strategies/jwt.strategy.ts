import { Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../services/auth.service'
import { UserDto } from '../../users/interfaces/users.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor (
    @Inject('AuthService') private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: (req: Request): string | null =>
        ExtractJwt.fromUrlQueryParameter('access_token')(req) ||
        ExtractJwt.fromBodyField('access_token')(req) ||
        ExtractJwt.fromAuthHeaderAsBearerToken()(req),
      secretOrKey: 'jwt-secret',
      ignoreExpiration: false
    })
  }

  async validate (payload: { user: UserDto }): Promise<UserDto> {
    return payload.user
  }
}
