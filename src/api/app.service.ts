import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser';
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "src/config";
import { AllExceptionsFilter } from "src/infrastructure/lib/exeption/all.exeption.filter";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

export default class Application {
  public static async main(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalFilters(new AllExceptionsFilter());

    app.use(cookieParser());

    app.enableCors({
      origin: '*',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
      }),
    );

    const apiPrefix = 'api';
    app.setGlobalPrefix(apiPrefix);

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/file/',
    });

    const swaggerConfig = new DocumentBuilder()
      .setTitle('RTU-library')
      .setDescription('API Documentation for OTP + Auth flow')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          description: 'Enter JWT token',
          name: 'Authorization',
          bearerFormat: 'JWT',
          scheme: 'bearer',
          in: 'header',
        },
        'access-token'
      ).addSecurityRequirements('Bearer').build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup(apiPrefix, app, document);

    await app.listen(config.API_PORT || 3002);
    console.log(`🚀 Server running on http://localhost:${config.API_PORT || 3002}`);
    console.log(`📘 Swagger Docs: http://localhost:${config.API_PORT || 3002}/${apiPrefix}`);
  }
}
