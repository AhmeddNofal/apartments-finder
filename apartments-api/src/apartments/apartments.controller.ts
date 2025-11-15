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
  Query,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { QueryApartmentDto } from './dto/query-apartment.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  // CREATE
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new apartment' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Apartment data + optional image upload',
    schema: {
      type: 'object',
      properties: {
        unitName: { type: 'string' },
        unitNo: { type: 'number' },
        bedrooms: { type: 'number' },
        baths: { type: 'number' },
        unitArea: { type: 'number' },
        price: { type: 'number' },
        address: { type: 'string' },
        images: { type: 'array', items: { type: 'string' }, nullable: true },
        file: { type: 'string', format: 'binary', nullable: true },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Apartment created successfully.',
    schema: {
      example: {
        _id: '654d2a1234567890abcdef12',
        unitName: 'Sea View Apartment',
        unitNo: 301,
        bedrooms: 3,
        baths: 2,
        unitArea: 120,
        price: 250000,
        address: '12 Nile Street, Cairo',
        images: ['655a9c1234567890abcdef34'],
      },
    },
  })
  async create(
    @Body() createApartmentDto: CreateApartmentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.apartmentsService.create(createApartmentDto, file);
  }

  // FIND ALL
  @Get()
  @ApiOperation({ summary: 'Get all apartments with filters/pagination' })
  @ApiQuery({ type: QueryApartmentDto })
  @ApiResponse({
    status: 200,
    description: 'List of apartments with pagination info.',
    schema: {
      example: {
        data: [
          {
            _id: '654d2a1234567890abcdef12',
            unitName: 'Sea View Apartment',
            unitNo: 301,
            bedrooms: 3,
            baths: 2,
            unitArea: 120,
            price: 250000,
            address: '12 Nile Street, Cairo',
            images: ['655a9c1234567890abcdef34'],
            createdAt: '2025-11-15T12:00:00.000Z',
            updatedAt: '2025-11-15T12:00:00.000Z',
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    },
  })
  async findAll(@Query() query: QueryApartmentDto) {
    return this.apartmentsService.findAll(query);
  }

  // FIND ONE
  @Get(':id')
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Apartment found.',
    schema: {
      example: {
        _id: '654d2a1234567890abcdef12',
        unitName: 'Sea View Apartment',
        unitNo: 301,
        bedrooms: 3,
        baths: 2,
        unitArea: 120,
        price: 250000,
        address: '12 Nile Street, Cairo',
        images: ['655a9c1234567890abcdef34'],
        createdAt: '2025-11-15T12:00:00.000Z',
        updatedAt: '2025-11-15T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Apartment not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Apartment with ID 654d2a1234567890abcdef12 not found',
        error: 'Not Found',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.apartmentsService.findOne(id);
  }

  // GET IMAGE
  @Get('file/:id')
  @ApiOperation({ summary: 'Download apartment image by file ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Image file returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'File not found.',
    schema: {
      example: { statusCode: 404, message: 'File not found', error: 'Not Found' },
    },
  })
  download(@Param('id') id: string, @Res() res: Response) {
    return this.apartmentsService.downloadFile(id, res);
  }

  // UPDATE
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update an existing apartment' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Apartment updated successfully.',
    schema: {
      example: {
        _id: '654d2a1234567890abcdef12',
        unitName: 'Sea View Apartment Renovated',
        unitNo: 301,
        bedrooms: 4,
        baths: 3,
        unitArea: 140,
        price: 300000,
        address: '12 Nile Street, Cairo',
        images: ['655a9c1234567890abcdef34', '655b9c1234567890abcdef35'],
        createdAt: '2025-11-15T12:00:00.000Z',
        updatedAt: '2025-11-16T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Apartment not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Apartment with ID 654d2a1234567890abcdef12 not found',
        error: 'Not Found',
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.apartmentsService.update(id, updateApartmentDto, file);
  }

  // DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Delete apartment by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Apartment deleted successfully.',
    schema: {
      example: { message: 'Apartment with ID 654d2a1234567890abcdef12 deleted successfully' },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Apartment not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Apartment with ID 654d2a1234567890abcdef12 not found',
        error: 'Not Found',
      },
    },
  })
  async remove(@Param('id') id: string) {
    return this.apartmentsService.remove(id);
  }
}
