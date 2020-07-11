import { Inject, Controller, Get } from '@nestjs/common'
import { Connection } from 'typeorm'

@Controller()
export class AppController {
  constructor (
    @Inject('Connection') private readonly db: Connection
  ) {}

  @Get('/health')
  getHealth (): string {
    if (this.db.isConnected) return 'OK'

    throw new Error('Unhealthy')
  }
}
