import { Image, LocationProduct, ProductBatch } from "src/entities";
import { CreateBatchClientDto } from "./create-batch.dto";
import { CreateLocationProductDto } from "./create-location-product.dto";

export class EditProductClientDto {
    _id: string;
    name: string;
    code: number;
    price: number;
    cost: number;
    category: string;
    locations: (LocationProduct | Omit<CreateLocationProductDto, 'productId'>)[]
    batches?: (ProductBatch | CreateBatchClientDto)[]
    batchEnabled: boolean;
    image?: Image
}

// {
//     _id: '15f00f17-bf60-4f87-933a-b0d2ab49467f',
//     name: 'Refactor',
//     code: 0,
//     price: 90,
//     cost: 30,
//     category: 'd7d2781c-e5cf-4cb8-8975-1e2df9102e86',
//     locations: [
//       {
//         locationId: '12119ed4-fa5e-43f1-832a-0bf490d66869',
//         stock: 5,
//         _id: 'c6e0a2ec-4c15-444e-aff3-704e29e78dd6',
//         productId: '15f00f17-bf60-4f87-933a-b0d2ab49467f'
//       }
//     ],
//     batches: [
//       {
//         expirationDate: '2024-08-03T06:00:00.000Z',
//         locationProduct: [Object],
//         batchNumber: 1,
//         stock: 2
//       }
//     ],
//     batchEnabled: true,
//     image: {
//       url: 'https://cdn.kristall.app/5e288d36-31a4-42a7-a62c-f6d7dae382eb',
//       _id: '5e288d36-31a4-42a7-a62c-f6d7dae382eb'
//     }
//   }