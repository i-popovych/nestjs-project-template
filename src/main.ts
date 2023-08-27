import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("API documentation")
    .setVersion("1.0")
    .addTag("template")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  // app.useGlobalGuards(JwtAuthGuard) // to use guard for all controllers
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () =>
    console.log(`Server was started on PORT: ${PORT}`)
  );
}

start();
