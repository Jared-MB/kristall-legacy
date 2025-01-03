import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { LocationProduct } from "../models/location-product.model";

@Injectable()
export class LocationProductRepository {
	constructor(
        @InjectRepository(LocationProduct)
        private readonly locationProductRepository: Repository<LocationProduct>
    ) { }

	async incrementStock(
		{ productId, locationId }: { productId: string; locationId: string },
		increment: number,
	) {
		return await this.locationProductRepository.increment(
			{
				locationId,
				productId,
			},
			"stock",
			increment,
		);
	}
}
