import { IsString, IsNumber, IsArray, IsOptional, Min, MinLength } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @MinLength(1)
  unitName: string;

  @IsNumber()
  @Min(0)
  unitNo: number;

  @IsNumber()
  @Min(0)
  bedrooms: number;

  @IsNumber()
  @Min(0)
  baths: number;

  @IsNumber()
  @Min(0)
  unitArea: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsOptional()
  images?: string[];
}
