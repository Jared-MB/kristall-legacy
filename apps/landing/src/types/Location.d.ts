import type { Shop } from ".";

export interface LocationProduct {
	locationId: string;
	stock: number;
	productId: string;
	_id?: string;
}

export interface Location {
	phone?: string | number;
	name: string;
	_id: string;
	address: string;
	shop?: Shop;
}

export interface DeliveryLocation extends Location {
	isLocal: boolean;
	name?: string;
}
