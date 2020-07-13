import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
import { LocalTokenStrategy } from './strategies/local-token.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jwt-secret',
      signOptions: { expiresIn: '15m' }
    }),
    UsersModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    LocalTokenStrategy,
    JwtStrategy
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
