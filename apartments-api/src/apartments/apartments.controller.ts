import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createApartmentDto: CreateApartmentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.apartmentsService.create(createApartmentDto, file);
  }

  @Get()
  async findAll() {
    return this.apartmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.apartmentsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.apartmentsService.update(id, updateApartmentDto, file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.apartmentsService.remove(id);
  }
}
