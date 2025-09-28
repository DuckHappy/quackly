import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string; //to fix data in service i change description?: string | null;

  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
