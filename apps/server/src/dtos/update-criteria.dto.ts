import { IsUUID } from "class-validator"

export class UpdateCriteriaDto {
    @IsUUID()
    _id: string

    @IsUUID()
    shopId: string
}