import { Shop } from "@/server/entities"

export class CreateSettingServerDto {
    shop: Partial<Shop>
    defaultBatchEnabled?: boolean
}