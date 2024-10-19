import { Shop } from "src/entities"

export class CreateSettingServerDto {
    shop: Partial<Shop>
    defaultBatchEnabled?: boolean
}