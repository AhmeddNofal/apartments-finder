import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsOptional, Min, MinLength, IsPositive } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @MinLength(1)
  unitName: string;

  @IsNumber()
  @Type(() => Number)
  unitNo: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  bedrooms: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  baths: number;

  @IsNumber()
  @Min(50)
  @Type(() => Number)
  unitArea: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsArray()
  @IsOptional()
  images?: string[];

}
