import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

;(async () => {
  const app = await NestFactory.create(AppModule)

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Shoplist API')
      .setDescription('Service providing functionality for managing and sharing shopping lists and their items through a REST API.')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
  )
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT || 3000)
})()
