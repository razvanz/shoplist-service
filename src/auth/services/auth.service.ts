import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../../users/services/users.service'
import { UserDto } from '../../users/interfaces/users.dto'
import { LoginResponseDto } from '../interfaces/login.dto'

@Injectable()
export class AuthService {
  constructor (
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('UsersService') private readonly usersService: UsersService
  ) {}

  async validateUser (token: string): Promise<UserDto> {
    const [user] = await this.usersService.listUsers({ token })

    return user
  }

  async login (user: UserDto): Promise<LoginResponseDto> {
    return {
      access_token: this.jwtService.sign({ user: JSON.parse(JSON.stringify(user)) })
    }
  }
}
