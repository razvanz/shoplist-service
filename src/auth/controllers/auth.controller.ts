import { Inject, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'
import { Request } from 'express'
import { LocalTokenAuthGuard } from '../guards/local-token-auth.guard'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { AuthService } from '../services/auth.service'
import { UserDto } from '../../users/interfaces/users.dto'
import { LoginDto, LoginResponseDto } from '../interfaces/login.dto'

@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'Unauthorized'
})
@Controller('/auth')
export class AuthController {
  constructor (
    @Inject('AuthService') private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Authenticate with a user\'s API token to obtain an JWT token',
    description: `
      Use the following default API tokens for testing:

      - client user (can only see and edit his shoplists)
        9ad088b8f9b247db9e59289248b4c0d5c2b29074ef1e4c5290a5c0ba754444de

      - buyer user (can see all shoplists but cannot edit)
        c0d5c2b29074ef1e4c5290a5c0ba754444de9ad088b8f9b247db9e59289248b4
    `
  })
  @ApiBody({
    type: LoginDto,
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'Authenticates the user and returns an access_token',
    type: LoginResponseDto
  })
  @UseGuards(LocalTokenAuthGuard)
  login (@Req() req: Request): Promise<LoginResponseDto> {
    return this.authService.login(req.user as UserDto)
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns current user profile',
    type: UserDto
  })
  @UseGuards(JwtAuthGuard)
  getProfile (@Req() req: Request): UserDto {
    return req.user as UserDto
  }
}
