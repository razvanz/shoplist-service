import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import initConfig from './config'
import { AppController } from './app.controller'
import { ShoplistsModule } from './shoplists/shoplists.module'
import { AuthModule } from './auth/auth.module'

import { User } from './users/entities/user.entity'
import { Item } from './shoplists/entities/item.entity'
import { Shoplist } from './shoplists/entities/shoplist.entity'

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
        entities: [
          // 'dist/**/*.entity.js'
          User,
          Item,
          Shoplist
        ],
        synchronize: true
      })
    }),
    AuthModule,
    ShoplistsModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
