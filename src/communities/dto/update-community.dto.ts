import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityDto } from './create-community.dto';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

}
