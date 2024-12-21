import type { Product } from "src/entities"

export class GetProductQueryDto {
    take?: number
    skip?: number
    name?: string
    location?: string
    sortBy?: keyof Product
    orderBy?: 'ASC' | 'DESC'
    category?: string
}