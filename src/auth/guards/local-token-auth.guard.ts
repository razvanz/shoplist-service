import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalTokenAuthGuard extends AuthGuard('local-token') {}
