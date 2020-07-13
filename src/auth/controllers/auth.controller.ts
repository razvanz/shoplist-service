import { Inject, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { LocalTokenAuthGuard } from '../guards/local-token-auth.guard'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { AuthService } from '../services/auth.service'
import { UserDto } from '../../users/interfaces/users.dto'
import { LoginDto } from '../interfaces/login.dto'

@Controller('/auth')
export class AuthController {
  constructor (
    @Inject('AuthService') private readonly authService: AuthService
  ) {}

  @Post('login')
  @UseGuards(LocalTokenAuthGuard)
  login (@Req() req: Request): Promise<LoginDto> {
    return this.authService.login(req.user as UserDto)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile (@Req() req: Request): UserDto {
    return req.user as UserDto
  }
}
