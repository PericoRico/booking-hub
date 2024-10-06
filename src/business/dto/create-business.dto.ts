import { IsString, IsEmail, IsPhoneNumber, IsNumber, IsOptional, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class OwnerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @IsPhoneNumber(null)
    @IsOptional() // El teléfono es opcional
    phone?: string;
}

class LocationDto {
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    zipCode: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}

class OpeningHoursDto {
    @IsString()
    monday: string;

    @IsString()
    tuesday: string;

    @IsString()
    wednesday: string;

    @IsString()
    thursday: string;

    @IsString()
    friday: string;

    @IsString()
    saturday: string;

    @IsString()
    sunday: string;
}

class BusinessDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    password: string; // Aquí se espera que se pase el hash de bcrypt

    @ValidateNested()
    @Type(() => OwnerDto)
    owner: OwnerDto;
}

export class CreateBusinessDto {
    @ValidateNested()
    @Type(() => BusinessDto)
    business: BusinessDto;

    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @ValidateNested()
    @Type(() => OpeningHoursDto)
    openingHours: OpeningHoursDto;
}
