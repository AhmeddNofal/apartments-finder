import { Module } from '@nestjs/common';
import { GridFsService } from './grid-fs.service';

@Module({
  providers: [GridFsService],
  exports: [GridFsService]
})
export class GridFsModule {}
