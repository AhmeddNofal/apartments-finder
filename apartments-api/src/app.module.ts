import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentsModule } from './apartments/apartments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GridFsModule } from './grid-fs/grid-fs.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/apartments'), ApartmentsModule, GridFsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}