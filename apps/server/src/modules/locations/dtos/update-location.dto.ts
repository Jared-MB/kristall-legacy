import { IsOptional, IsUUID } from "class-validator";

export class UpdateLocationDto {
    @IsUUID()
    _id: string;

    @IsOptional()
    name?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    phone?: number;
}