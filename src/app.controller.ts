import { Inject, Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Connection } from 'typeorm'

@ApiTags('healthcheck')
@Controller()
export class AppController {
  constructor (
    @Inject('Connection') private readonly db: Connection
  ) {}

  @Get('/health')
  @ApiOperation({ summary: 'Retrieve service status' })
  @ApiResponse({
    status: 200,
    description: 'Healthy'
  })
  @ApiResponse({
    status: 500,
    description: 'Unhealthy'
  })
  getHealth (): string {
    if (this.db.isConnected) return 'OK'

    throw new Error('Unhealthy')
  }
}
