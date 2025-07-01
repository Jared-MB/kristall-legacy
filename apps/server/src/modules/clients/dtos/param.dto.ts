import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { ClientStatus } from "../types/client-status";

export class ParamDto {
    @IsUUID()
    id: string
}



export class QueryClientDto {
    @IsOptional()
    @IsEnum(ClientStatus)
    status?: ClientStatus
}