import { IsString, IsEmail, IsPhoneNumber, IsNumber, IsOptional, ValidateNested, IsNotEmpty, IsArray, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

class OwnerDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'johndoe@example.com' })
    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @ApiProperty({ example: '+34611223344' })
    @IsPhoneNumber(null)
    @MaxLength(15)
    @IsOptional()
    phone?: string;
}

class LocationDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    zipCode: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}

class OpeningHoursDto {
    @ApiProperty()
    @IsString()
    monday: string;

    @ApiProperty()
    @IsString()
    tuesday: string;

    @ApiProperty()
    @IsString()
    wednesday: string;

    @ApiProperty()
    @IsString()
    thursday: string;

    @ApiProperty()
    @IsString()
    friday: string;

    @ApiProperty()
    @IsString()
    saturday: string;

    @ApiProperty()
    @IsString()
    sunday: string;
}

class BusinessDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    type: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string; // Aquí se espera que se pase el hash de bcrypt

    @ApiProperty()
    @ValidateNested()
    @Type(() => OwnerDto)
    owner: OwnerDto;
}

export class ServicesDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    duration: number;

}

export class ImagesDto {
    @ApiProperty()
    @IsString()
    hero: string;

    @ApiProperty()
    @IsArray()
    additionalImages: string[];
}


export class CreateBusinessDto {
    @ApiProperty()
    @ValidateNested()
    @Type(() => BusinessDto)
    business: BusinessDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => OpeningHoursDto)
    openingHours: OpeningHoursDto;

    @ApiProperty({ type: ServicesDto, isArray: true })
    @ValidateNested()
    @Type(() => ServicesDto)
    services: ServicesDto[];

    @ApiProperty()
    @ValidateNested()
    @Type(() => ImagesDto)
    images: ImagesDto;
}
