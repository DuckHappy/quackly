import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateFollowDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
    
    @IsNumber()
    @IsNotEmpty()
    communityId: number;
}
