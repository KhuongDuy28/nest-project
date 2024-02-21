import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoConnection } from './mongo.config';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    MongoConnection,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
