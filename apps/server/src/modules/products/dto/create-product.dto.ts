import { Image, LocationProduct, Shop } from "@/server/entities";
import { CreateBatchClientDto } from "./create-batch.dto";
import { CreateLocationProductDto } from "./create-location-product.dto";

export class CreateProductClientDto {
    name: string;
    code: number;
    price: number;
    cost: number;
    category: string;
    locations: Omit<CreateLocationProductDto, 'productId'>[];
    batches?: CreateBatchClientDto[];
    batchEnabled: boolean;
    image?: Image
}

export class CreateProductServerDto {
    name: string
    code: string
    price: number
    category: { _id: string }
    locations: LocationProduct[]
    batchEnabled: 0 | 1
    image?: Image
    shop: Shop
    stock: number
    _id: string
    cost: number
}