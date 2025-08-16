import { IsUUID } from "class-validator"

export class CriteriaDto {
    /**
     * Entity _id to interact with
     */
    @IsUUID()
    _id: string

    @IsUUID()
    /**
     * Shop _id to interact with
     */
    shopId: string
}