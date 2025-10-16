import { IsNumber, IsNotEmpty } from "class-validator";

export class JoinCommunityDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}