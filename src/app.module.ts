import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import initConfig from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [initConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore (can't infer type of database.client)
      useFactory: (configService: ConfigService) => ({
        type: configService.get('database.client'),
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.schema'),
        synchronize: true
      })
    })
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
