import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('NestjsFirstProject')
    .setDescription('RestfulAPI users with auth')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  

  await app.listen(3000);
}
bootstrap();

