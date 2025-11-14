import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { GridFsService } from 'src/grid-fs/grid-fs.service';
import { Apartment, ApartmentSchema } from './schemas/apartment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Apartment.name, schema: ApartmentSchema }])
  ],
  controllers: [ApartmentsController],
  providers: [ApartmentsService, GridFsService]
})
export class ApartmentsModule {}
