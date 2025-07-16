import { IsUUID } from "class-validator";
import { CreateClientDto } from "./create-client.dto";

export class UpdateClientDto extends CreateClientDto {
    @IsUUID()
    _id: string
}