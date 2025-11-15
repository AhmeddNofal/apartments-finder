import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryApartmentDto {
  // Pagination
  @ApiPropertyOptional({
    description: 'Page number (pagination)',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page (pagination)',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  // Search
  @ApiPropertyOptional({
    description: 'Search in unitName and address (case-insensitive)',
    example: 'Sea View',
  })
  @IsOptional()
  @IsString()
  search?: string;

  // Filters
  @ApiPropertyOptional({
    description: 'Minimum price',
    example: 100000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price',
    example: 500000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Number of bedrooms',
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({
    description: 'Number of bathrooms',
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  baths?: number;

  @ApiPropertyOptional({
    description: 'Minimum unit area (m²)',
    example: 80,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minArea?: number;

  @ApiPropertyOptional({
    description: 'Maximum unit area (m²)',
    example: 200,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxArea?: number;

  @ApiPropertyOptional({
    description: 'Exact unit number',
    example: 301,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitNo?: number;
}
