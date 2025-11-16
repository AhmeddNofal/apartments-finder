import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { GridFsService } from 'src/grid-fs/grid-fs.service';
import { Apartment, ApartmentSchema } from './schemas/apartment.schema';
import { GridFsModule } from 'src/grid-fs/grid-fs.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Apartment.name, schema: ApartmentSchema }]),
    CacheModule.register({
      ttl: 5000, // milliseconds
    }),
    GridFsModule
  ],
  controllers: [ApartmentsController],
  providers: [ApartmentsService, GridFsService]
})
export class ApartmentsModule implements OnModuleInit {
  constructor(private readonly apartmentsService: ApartmentsService) { }

  async onModuleInit() {
    await this.apartmentsService.seedIfEmpty();
  }
}
