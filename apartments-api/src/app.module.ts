import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentsModule } from './apartments/apartments.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/apartments'), ApartmentsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}