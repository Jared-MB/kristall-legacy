import { LocationProduct } from "@kristall/server/src/entities";
import { CreateLocationProductDto } from "./create-location-product.dto";

// FROM CLIENT
export class CreateBatchClientDto {
    expirationDate: string;
    locationProduct: Omit<CreateLocationProductDto, 'productId'>;
    stock: number;
    batchNumber: number;
}

// READY TO BE SAVED
export class CreateBatchServerDto {
    expirationDate: string;
    locationProduct: LocationProduct;
    stock: number;
    batchNumber: number;
}