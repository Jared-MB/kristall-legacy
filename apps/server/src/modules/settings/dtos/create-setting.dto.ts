import { Shop } from "@kristall/server/src/entities"

export class CreateSettingServerDto {
    shop: Partial<Shop>
    defaultBatchEnabled?: boolean
}